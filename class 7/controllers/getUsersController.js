const User = require("../models/user");

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
    getAllUsersforAdmin,
}