const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Get user's cart
router.get("/:userId", cartController.getCart);

// Add item to cart
router.post("/:userId", cartController.addToCart);

// Update cart item quantity
router.put("/:userId/item/:itemId", cartController.updateCartItem);

// Remove item from cart
router.delete("/:userId/item/:itemId", cartController.removeFromCart);

// Clear cart
router.delete("/:userId", cartController.clearCart);

module.exports = router;
