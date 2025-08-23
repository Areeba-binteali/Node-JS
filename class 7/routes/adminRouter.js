const authMiddleware = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/checkAdmin");
const { getAllUsersforAdmin } = require("../controllers/getUsersController");
const { getAllClassesForAdmin, createNewClass, updateClass, deleteClass } = require("../controllers/classesController");
const { getAllCoursesForAdmin, createNewCourse, updateCourse, deleteCourse } = require("../controllers/coursesController");
const adminRouter = require("express").Router();

// Get all Users
adminRouter.get("/admin/get-all-users", authMiddleware, adminOnly, getAllUsersforAdmin);

// Get all Classes
adminRouter.get("/admin/get-all-classes", authMiddleware, adminOnly, getAllClassesForAdmin);

// Create New Class
adminRouter.post("/admin/create-new-class", authMiddleware, adminOnly, createNewClass);

// Update Class
adminRouter.put("/admin/class/:id", authMiddleware, adminOnly, updateClass);

// Delete Class
adminRouter.delete("/admin/class/:id", authMiddleware, adminOnly, deleteClass);

// Get all Courses
adminRouter.get("/admin/get-all-courses", authMiddleware, adminOnly, getAllCoursesForAdmin);

// Create New Course
adminRouter.post("/admin/create-new-course", authMiddleware, adminOnly, createNewCourse);

// Update Course
adminRouter.put("/admin/course/:id", authMiddleware, adminOnly, updateCourse);

// Delete Course
adminRouter.delete("/admin/course/:id", authMiddleware, adminOnly, deleteCourse);

module.exports = adminRouter