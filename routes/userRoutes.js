const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// User signup
router.post("/signup", userController.signup);

// User login
router.post("/login", userController.login);

// Get user by ID
router.get("/:id", userController.getUser);

// Get all users
router.get("/", userController.getAllUsers);

// Create user (Admin)
router.post("/", userController.createUser);

// Update user
router.put("/:id", userController.updateUser);

// Delete user
router.delete("/:id", userController.deleteUser);

module.exports = router;
