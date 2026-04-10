const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// MongoDB Connection
const mongoUri = process.env.MONGO_URI || "mongodb+srv://shalinikj05_db_user:Shalini%40123@wowcart.bolf1kq.mongodb.net/wowcart";

mongoose
  .connect(mongoUri, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);
