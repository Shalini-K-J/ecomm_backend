const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Get all orders (for admin) - MUST come before parameterized routes
router.get("/", orderController.getAllOrders);

// Get user's orders
router.get("/:userId", orderController.getOrders);

// Get order by ID
router.get("/order/:id", orderController.getOrderById);

// Create order
router.post("/:userId", orderController.createOrder);

// Update order status (for admin)
router.put("/:id/status", orderController.updateOrderStatus);

module.exports = router;
