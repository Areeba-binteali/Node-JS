const Product = require("../models/product");

const addProduct = async (req, res) => {
    try {
        const newProduct = req.body;

        if ( !newProduct.name || !newProduct.price || !newProduct.stock ) {
            return res.status(400).send({
                success: false,
                message: "Please enter valid product name, price, stock"
            })
        }

        const newProd = new Product(newProduct);
        await newProd.save();
        res.status(201).send({
            success: true,
            message: "Product created Succesfully",
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        })
    }
}


const getAllProducts = async (req, res) => {
    try{
        const Products = await Product.find({})
        res.status(200).send({
            success: true,
            data: Products
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
    addProduct,
    getAllProducts
}