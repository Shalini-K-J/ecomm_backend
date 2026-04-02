const Order = require("../models/Order");

// Get user's orders
exports.getOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    
    res.json({ data: orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const order = await Order.findById(id);
    
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    
    res.json({ data: order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { userId } = req.params;
    const { items, totalAmount, shippingAddress, paymentMethod } = req.body;

    console.log('Creating order with data:', { userId, items, totalAmount, shippingAddress, paymentMethod });

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    if (!totalAmount) {
      return res.status(400).json({ error: "Total amount is required" });
    }

    const newOrder = new Order({
      userId,
      items: items || [],
      totalAmount,
      shippingAddress,
      paymentMethod: paymentMethod || 'COD',
      status: 'pending'
    });

    const savedOrder = await newOrder.save();
    console.log('Order saved successfully:', savedOrder._id);

    res.json({
      message: "Order placed successfully",
      data: savedOrder
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update order status (for admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({
      message: "Order status updated",
      data: order
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all orders (for admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ data: orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
