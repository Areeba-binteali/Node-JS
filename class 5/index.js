require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const MONGODB_URI = process.env.MONGODB_URI; 
const jwt = require("jsonwebtoken");
const Post = require("./models/post");
const authMiddleware = require("./middleware/authMiddleware");
const logReqBody = require("./middleware/logReqBody");

const app = express();

// Middleware
app.use(express.json());
app.use(logReqBody)


// Connecting mongoose
mongoose.connect(MONGODB_URI)
    .then(() => { console.log('Connected!'); })
    .catch(err => console.log(err))


console.log("JWT_TOKEN = " + process.env.JWT_TOKEN);

// users
app.get("/api/users", authMiddleware, async (req, res) => {
    try {
        const user = await User.find();
        const userId = req.userId;
        const posts = await Post.find({author: user._id});
        console.log(posts);
        res.status(200).send({
            message: "users data",
            relatedPosts: posts,
            data: user,
        })
    } catch (error) {
        res.status(500).send({
            message: "Error in getting Data",
            error: error,
        })
    }
});

// posting new user
app.post("/api/users", async (req, res) => {
    try {
        const newUser = req.body;
        const password = await bcrypt.hash(newUser.password, 10)
        const user = new User({ ...newUser, password: password });
        await user.save();
        res.send({
            data: user,
            message: "success",
        })
    } catch (error) {
        res.status(500).send({ data: null, success: false, error });
    }
});

// login user
app.post("/api/users/signin", async (req, res) => {
    try {
        const { emailAddress, password } = req.body;
        if (!emailAddress || !password) {
            return res.status(400).send({
                message: "Please provide valid Email Address and Password"
            })
        }
        const matchedUser = await User.findOne({ emailAddress: emailAddress });
        if (!matchedUser) {
            return res.status(404).send({
                message: "User not found",
                success: false,
                data: null
            });
        }

        const isValid = await bcrypt.compare(password, matchedUser.password);
        console.log(isValid);
        if (isValid) {
            const token = jwt.sign({
                _id: matchedUser._id,
                email: matchedUser.emailAddress
            }, "user-server-nodejs")
            return res.send({
                data: matchedUser,
                success: true,
                token: token
            })
        } else {
            return res.status(400).send({
                data: null,
                success: false,
                message: "Invalid credentials"
            })
        }
    } catch (error) {
        res.status(500).send({ data: null, success: false, error })
    }
});

// Create Post
app.post("/api/posts", authMiddleware, async (req, res) => {
    try{
        const userId = req.userId;
        const { content } = req.body;
        const newPost = new Post({ content: content, createdDate: new Date(), author: userId });
        await newPost.save();
        res.send({
            data: newPost,
            message: "success"
        })
    }catch (error){
        res.status(500).send({ data: null, success: false, error });
    }
})

// get all posts
app.get("/api/posts", authMiddleware, async (req, res) => {
    try {
        const posts = await Post.find().populate("author");
        return res.send({
            data: posts,
            success: true
        })
    } catch (error) {
        return res.status(500).send({
            data: null,
            success: false,
        })
    }
});

// server
const PORT = 3007;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});