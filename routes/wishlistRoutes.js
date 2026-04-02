const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

// Get user's wishlist
router.get("/:userId", wishlistController.getWishlist);

// Add item to wishlist
router.post("/:userId", wishlistController.addToWishlist);

// Remove item from wishlist
router.delete("/:userId/item/:itemId", wishlistController.removeFromWishlist);

// Clear wishlist
router.delete("/:userId", wishlistController.clearWishlist);

module.exports = router;
