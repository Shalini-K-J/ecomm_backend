const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const initialProducts = [
  { name: 'Wireless Headphones', price: 299, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', gst: 18, profit: 20, description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and crystal-clear sound quality. Perfect for music lovers and professionals.' },
  { name: 'Smart Watch', price: 199, category: 'Electronics', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', gst: 18, profit: 25, description: 'Advanced smart watch with heart rate monitoring, fitness tracking, and smartphone notifications. Water-resistant and stylish design.' },
  { name: 'Leather Bag', price: 149, category: 'Fashion', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400', gst: 12, profit: 30, description: 'Genuine leather messenger bag with multiple compartments. Perfect for work or travel, durable and elegant.' },
  { name: 'Running Shoes', price: 129, category: 'Sports', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', gst: 18, profit: 22, description: 'Lightweight running shoes with superior cushioning and grip. Ideal for athletes and fitness enthusiasts.' },
  { name: 'Coffee Maker', price: 89, category: 'Home', image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400', gst: 18, profit: 28, description: 'Automatic coffee maker with programmable timer. Brews delicious coffee in minutes with aromatic flavor.' },
  { name: 'Yoga Mat', price: 49, category: 'Fitness', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400', gst: 12, profit: 35, description: 'Eco-friendly yoga mat with non-slip surface. Extra thick for comfort during workouts and meditation.' },
  { name: 'Laptop Stand', price: 39, category: 'Accessories', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', gst: 18, profit: 25, description: 'Ergonomic laptop stand with adjustable height. Improves posture and reduces neck strain while working.' },
  { name: 'Water Bottle', price: 25, category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400', gst: 18, profit: 40, description: 'Insulated stainless steel water bottle keeps drinks cold for 24 hours or hot for 12 hours.' },
  { name: 'Bluetooth Speaker', price: 159, category: 'Electronics', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', gst: 18, profit: 30, description: 'Portable Bluetooth speaker with powerful bass and 360-degree sound. Waterproof design for outdoor use.' },
  { name: 'Fitness Tracker', price: 79, category: 'Electronics', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400', gst: 18, profit: 35, description: 'Smart fitness band with step counter, sleep monitor, and heart rate sensor. Sleek design fits any style.' },
  { name: 'Sunglasses', price: 89, category: 'Fashion', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', gst: 12, profit: 45, description: 'UV400 protection sunglasses with polarized lenses. Stylish frames that provide complete eye protection.' },
  { name: 'Backpack', price: 119, category: 'Fashion', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', gst: 12, profit: 28, description: 'Durable backpack with laptop compartment and multiple pockets. Perfect for school, college, or travel.' },
  { name: 'Tennis Racket', price: 189, category: 'Sports', image: 'https://images.unsplash.com/photo-1617083934555-ac7b4d0c8be2?w=400', gst: 18, profit: 25, description: 'Professional-grade tennis racket with carbon fiber frame. Lightweight yet powerful for competitive play.' },
  { name: 'Cricket Bat', price: 249, category: 'Sports', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', gst: 18, profit: 22, description: 'Willow cricket bat with excellent stroke. Handcrafted for optimal balance and power hitting.' },
  { name: 'LED Lamp', price: 45, category: 'Home', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', gst: 18, profit: 40, description: 'Modern LED desk lamp with touch control and adjustable brightness. Energy-efficient with eye protection.' },
  { name: 'Plant Pot', price: 35, category: 'Home', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400', gst: 12, profit: 50, description: 'Ceramic plant pot with drainage hole. Modern design adds elegance to any indoor space.' },
  { name: 'Dumbbells Set', price: 299, category: 'Fitness', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', gst: 18, profit: 30, description: 'Adjustable dumbbells set ranging from 5-25 lbs. Perfect for home gym and strength training.' },
  { name: 'Resistance Bands', price: 29, category: 'Fitness', image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400', gst: 12, profit: 55, description: 'Set of 5 resistance bands with different tension levels. Ideal for warm-up and strength exercises.' },
  { name: 'Phone Case', price: 19, category: 'Accessories', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400', gst: 18, profit: 60, description: 'Shockproof phone case with precise cutouts. Premium protection with slim design.' },
  { name: 'USB Cable', price: 15, category: 'Accessories', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', gst: 18, profit: 65, description: 'Fast charging USB cable with durable nylon braid. Compatible with all USB-C devices.' },
  { name: 'Notebook Set', price: 24, category: 'Stationery', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400', gst: 12, profit: 45, description: 'Set of 3 premium notebooks with high-quality paper. Perfect for journaling, notes, and sketching.' },
  { name: 'Pen Set', price: 18, category: 'Stationery', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400', gst: 12, profit: 50, description: 'Luxury pen set with ballpoint and rollerball pens. Smooth writing experience with elegant design.' },
  { name: 'Desk Organizer', price: 39, category: 'Office', image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=400', gst: 18, profit: 35, description: 'Multi-compartment desk organizer for pens, cards, and accessories. Keeps your workspace tidy.' },
  { name: 'Wall Clock', price: 59, category: 'Home', image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400', gst: 18, profit: 40, description: 'Modern silent wall clock with large numbers. Battery operated with sleek frame design.' }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // Check if products already exist
    const count = await Product.countDocuments();
    if (count > 0) {
      console.log(`⚠️ Products already exist (${count}). Skipping seed.`);
    } else {
      // Insert all products
      await Product.insertMany(initialProducts);
      console.log('✅ Seeded 24 products successfully!');
    }

    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
