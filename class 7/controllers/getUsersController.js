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

const getAvgAgeOfStd = async (req, res) => {
    try {
        // console.log(req.userId, req.userRole);

        const result = await User.aggregate([
            { $match: { role: "student", } }, 
            { 
                $group: { 
                    role: "$role", 
                    avgSuccess: { 
                        $avg: { 
                            $subtract: [new Date(), "$dob"] 
                        } 
                    } 
                } 
            }]);
        return res.send({ data: result, })
    } catch (error) {
        return res.status(500).send({ message: error.message, })
    }
}

module.exports = {
    getAvgAgeOfStd,
    getAllUsersforAdmin,
}