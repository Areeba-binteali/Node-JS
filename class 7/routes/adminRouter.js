const authMiddleware = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/checkAdmin");
const { getAllUsersforAdmin } = require("../controllers/getUsersController");
const { getAllClassesForAdmin, createNewClass, updateClass, deleteClass } = require("../controllers/classesController");
const { getAllCoursesForAdmin, createNewCourse, updateCourse, deleteCourse } = require("../controllers/coursesController");
const adminRouter = require("express").Router();

// Get all Users
adminRouter.get("/get-all-users", authMiddleware, adminOnly, getAllUsersforAdmin);

// Get all Classes
adminRouter.get("/get-all-classes", authMiddleware, getAllClassesForAdmin);

// Create New Class
adminRouter.post("/create-new-class", authMiddleware, adminOnly, createNewClass);

// Update Class
adminRouter.put("/class/:id", authMiddleware, adminOnly, updateClass);

// Delete Class
adminRouter.delete("/class/:id", authMiddleware, adminOnly, deleteClass);

// Get all Courses
adminRouter.get("/get-all-courses", authMiddleware, getAllCoursesForAdmin);

// Create New Course
adminRouter.post("/create-new-course", authMiddleware, adminOnly, createNewCourse);

// Update Course
adminRouter.put("/course/:id", authMiddleware, adminOnly, updateCourse);

// Delete Course
adminRouter.delete("/course/:id", authMiddleware, adminOnly, deleteCourse);

module.exports = adminRouter