const Wishlist = require("../models/Wishlist");

// Get user's wishlist
exports.getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    
    let wishlist = await Wishlist.findOne({ userId }).populate('items.productId');
    
    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [] });
      await wishlist.save();
    }
    
    res.json({ data: wishlist });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add item to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, name, price, image } = req.body;

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [] });
    }

    // Check if product already in wishlist
    const existingItemIndex = wishlist.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      return res.status(400).json({ error: "Product already in wishlist" });
    }

    wishlist.items.push({ productId, name, price, image });
    wishlist.updatedAt = Date.now();
    await wishlist.save();

    res.json({
      message: "Item added to wishlist",
      data: wishlist
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove item from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { userId, itemId } = req.params;

    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" });
    }

    wishlist.items = wishlist.items.filter(item => item._id.toString() !== itemId);
    wishlist.updatedAt = Date.now();
    await wishlist.save();

    res.json({
      message: "Item removed from wishlist",
      data: wishlist
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clear wishlist
exports.clearWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlist = await Wishlist.findOne({ userId });

    if (wishlist) {
      wishlist.items = [];
      wishlist.updatedAt = Date.now();
      await wishlist.save();
    }

    res.json({
      message: "Wishlist cleared",
      data: { userId, items: [] }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
