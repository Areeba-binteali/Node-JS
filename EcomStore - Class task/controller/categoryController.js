const Category = require("../models/category");

const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if ( !name ) {
            return res.status(400).send({
                success: false,
                message: "Name is a required field"
            });
        }

        const newCategory = new Category({
            name,
            description
        });
        await newCategory.save();

        res.status(201).send({
            success: true,
            message: "Category created succesfully"
        })
        
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
}


const getAllCategories = async (req, res) => {
    try{
        const categories = await Category.find({})
        res.status(200).send({
            success: true,
            data: categories
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
    createCategory,
    getAllCategories
}