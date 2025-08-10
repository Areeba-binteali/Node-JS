require("dotenv").config();

const express = require("express");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./models/user");
const auth = require("./middleware/auth");
const Post = require("./models/post");

const MongoDB_URI = process.env.MONGODB_URI;
const app = express();

app.use(express.json());
app.use(cors());

// Database connect
mongoose
    .connect(MongoDB_URI)
    .then(() => console.log("Database Connected!"))
    .catch((err) => console.log(err));


// Signup route
app.post("/sign-up", async (req, res) => {
    try {
        let newData = req.body;

        // Required fields check
        if (!newData.password || !newData.emailAddress || !newData.userName) {
            return res
                .status(400)
                .json({ message: "Please fill out the required fields", success: false });
        }

        // Duplicate email check
        const matchedEmail = await User.findOne({ emailAddress: newData.emailAddress });
        if (matchedEmail) {
            return res
                .status(400)
                .json({ message: "Already registered, please login", success: false });
        }

        // Password hash
        let hashedPass = await bcrypt.hash(newData.password, 10);

        // New user create
        const user = new User({
            ...newData,
            password: hashedPass
        });
        await user.save();

        // Token 
        const token = jwt.sign(
            { email: user.emailAddress, userName: user.userName },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: `Welcome ${user.userName} 🎉!`,
            success: true,
            token: token,
            description: "You have successfully signed up!",
            userName: user.userName
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false
        });
    }
});


// Login Route
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ emailAddress: email });
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }

        const token = jwt.sign({ email, userName: user.userName }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: `Welcome back ${user.userName} 🎉!`,
            token,
            description: "You have successfully logged in!",
            userName: user.userName,
            success: true
        });

    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
});

app.get("/verify-user", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ emailAddress: decoded.email });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User verified" });
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
});


// Public route — get all posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "userName emailAddress").sort({ createdDate: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});


// add new post
app.post("/add-new-post", auth, async (req, res) => {
    try {
        const { title, content, tags } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const newPost = new Post({
            title,
            content,
            tags,
            author: req.user._id,
            createdDate: new Date(),
            updatedDate: new Date(),
        });

        await newPost.save();

        // Populate author here
        const populatedPost = await Post.findById(newPost._id).populate("author", "userName emailAddress");


        console.log("Populated Post:", populatedPost); // Debug

        res.status(201).json({
            message: "Post created successfully!",
            post: populatedPost,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



// Protected Route Example
// app.get("/dashboard", auth, (req, res) => {
//     res.json({ message: `Hello ${req.user.userName}, this is your dashboard data.` });
// });

const PORT = 3007;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
