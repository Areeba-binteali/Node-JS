const authMiddleware = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/checkAdmin");
const { getAllUsersforAdmin } = require("../controllers/getUsersController");
const { getAllClassesForAdmin, createNewClass, updateClass, deleteClass } = require("../controllers/classesController");
const adminRouter = require("express").Router();

adminRouter.get("/admin/get-all-users", authMiddleware, adminOnly, getAllUsersforAdmin);
adminRouter.get("/admin/get-all-classes", authMiddleware, adminOnly, getAllClassesForAdmin);
adminRouter.post("/admin/create-new-class", authMiddleware, adminOnly, createNewClass);
adminRouter.put("/admin/class/:id", authMiddleware, adminOnly, updateClass);
adminRouter.delete("/admin/class/:id", authMiddleware, adminOnly, deleteClass);

module.exports = adminRouter