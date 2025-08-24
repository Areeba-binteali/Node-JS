const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken")

const signupController = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(400).send({
                success: false,
                message: "Please fill all the required fields",
            })
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "User already exist. Please login"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        })
        await newUser.save();

        res.status(201).send({
            success: true,
            message: "User registered successfully"
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }

}

const signinController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please enter a valid email and password"
            });
        }

        const matchedUser = await User.findOne({ email });

        if (!matchedUser) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }

        const isValid = await bcrypt.compare(password, matchedUser.password)

        if (!isValid) {
            return res.status(400).send({
                success: false,
                message: "Invalid Credentials"
            })
        }
        const token = jwt.sign({
            _id: matchedUser._id,
            email: matchedUser.email,
            role: matchedUser.role,
        }, process.env.JWT_SECRET)
        return res.send({
            data: matchedUser,
            success: true,
            token: token
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error: error
        })
    }
}

const getAllUsers = async (req, res) => {
    try{
        const Users = await User.find({})
        res.status(200).send({
            success: true,
            data: Users
        })
    }
    catch(error){
        return res.status(500).status({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports = {
    signupController,
    signinController,
    getAllUsers
}