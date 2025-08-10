const bcrypt  = require("bcrypt");
const User = require("../models/user");

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

module.exports = {
    signupController,
}
