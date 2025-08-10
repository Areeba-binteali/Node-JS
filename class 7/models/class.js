const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const classSchema = new Schema({
    className: {
        type: String,
        required: true,
        trim: true
    },
    section: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        min: 2000
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    classTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});


const Class = mongoose.model("class", classSchema);
module.exports = Class;