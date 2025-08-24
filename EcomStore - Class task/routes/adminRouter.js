const { createCategory, getAllCategories } = require("../controller/categoryController");
const { addProduct, getAllProducts } = require("../controller/productController");
const { getAllUsers } = require("../controller/userController");

const adminRouter = require("express").Router();

adminRouter.post("/add-category", createCategory);
adminRouter.post("/add-product", addProduct);
adminRouter.get("/get-all-users", getAllUsers);
adminRouter.get("/get-all-products", getAllProducts);
adminRouter.get("/get-all-categories", getAllCategories);

module.exports = adminRouter;