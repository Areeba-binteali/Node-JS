const bcrypt  = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken")

const signupController =  async (req, res) => {
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
};

const signinController = async (req, res) => {
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
                email: matchedUser.emailAddress,
                role: matchedUser.role,
            },process.env.JWT_SECRET)
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
}

const getAllUsersforAdmin = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).send({
            success: true,
            data: users
        })
    } catch (error) {
        return res.status(401).send({
            success: false,
        })
    }
}


module.exports = {
    signupController,
    getAllUsersforAdmin,
    signinController,
}
