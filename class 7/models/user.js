const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date
    },
    role: {
        type: String,
        enum: ['student', 'teacher', 'admin'], // fixed roles
        default: 'student'
    },
    profileImage: {
        type: String, // store image URL
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date
    }
});


const User = mongoose.model("user", userSchema);
module.exports = User;