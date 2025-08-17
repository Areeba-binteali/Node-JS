const Class = require("../models/class")

const getAllClassesForAdmin = async (req, res) => {
    try {
        const Classes = await Class.find();
        return res.status(200).send({
            success: true,
            data: Classes,
        })
    } catch (error) {
        return res.status(401).send({
            success: false,
        })
    }
}

const createNewClass = async (req, res) => {
    try {
        let { className, year, section } = req.body;
        if (!className || !year || !section) {
            res.status(400).send({
                success: false,
                message: "Please provide valid className, year or section"
            })
        }
        let addNew = new Class({ className: className, year: year, section: section, createdAt: new Date() })
        await addNew.save();
        res.status(201).send({
            success: true,
            data: addNew,
        })
    }
    catch (error) {
        return res.status(500).send({
            success: false,
            message: "Server Error"
        })
    }
}

const updateClass = async (req, res) => {
    try {
        const targetId = req.params.id;
        const { className, year, section, classTeacher, students=[] } = req.body;
        if(!Array.isArray(students)){
            return res.status(400).send({
                succes: false,
                message: "students must be an array of string"
            })
        }

        let updatedClass = await Class.findByIdAndUpdate(targetId, { className, year, section, classTeacher, students }, { new: true })
        updatedClass.save();

        return res.status(200).send({
            success: true,
            data: updatedClass
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const deleteClass = async (req, res) => {
    try {
        const targetId = req.params.id
        const deleteClass = await Class.findByIdAndDelete(targetId);
        if (!deleteClass){
            return res.status(404).send({
                success: false,
                message: "Class not Found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "Class Deleted Successfully"
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            messagae: "Internal server error"
        })
    }
}

module.exports = {
    getAllClassesForAdmin,
    createNewClass,
    updateClass,
    deleteClass
}