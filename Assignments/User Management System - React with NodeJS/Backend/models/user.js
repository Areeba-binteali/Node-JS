const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: String,
    emailAddress: String,
    password: String,
    dob: Date,
    age: Number
});

const User = mongoose.model("user", userSchema);
module.exports = User;