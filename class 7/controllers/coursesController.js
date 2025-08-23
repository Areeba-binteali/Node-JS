const Course = require("../models/course")

const getAllCoursesForAdmin = async (req, res) => {
    try {
        const Courses = await Course.find();
        return res.status(200).send({
            success: true,
            data: Courses,
        })
    } catch (error) {
        return res.status(401).send({
            success: false,
        })
    }
}

const createNewCourse = async (req, res) => {
    try {
        let { title, description, duration, classId } = req.body;
        if (!title || !description || !duration) {
            res.status(400).send({
                success: false,
                message: "Please provide valid course name, description or duration"
            })
        }
        let addNew = new Course({ title: title, description: description, duration: duration, createdAt: new Date(), classId: classId  })
        await addNew.save();
        res.status(201).send({
            success: true,
            data: addNew,
        })
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "Server Error",
        })
    }
}

const updateCourse = async (req, res) => {
    try {
        const targetId = req.params.id;
        const { title, description, duration, teacher, tags=[], startDate, endDate, students=[] } = req.body;
        if(!Array.isArray(students) || !Array.isArray(tags)){
            return res.status(400).send({
                success: false,
                message: "students must be an array of string"
            })
        }

        let updatedCourse = await Course.findByIdAndUpdate(targetId, { title, description, duration, teacher, startDate, endDate, tags, students }, { new: true })
        updatedCourse.save();

        return res.status(200).send({
            success: true,
            data: updatedCourse
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const deleteCourse = async (req, res) => {
    try {
        const targetId = req.params.id
        const deleteCourse = await Course.findByIdAndDelete(targetId);
        if (!deleteCourse){
            return res.status(404).send({
                success: false,
                message: "Course not Found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "Course Deleted Successfully"
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}

module.exports = {
    getAllCoursesForAdmin,
    createNewCourse,
    updateCourse,
    deleteCourse
}