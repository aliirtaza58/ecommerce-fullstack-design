const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const sampleProducts = [
  {
    name: "Premium Wireless Headphones",
    price: 299.99,
    image: "/images/headphones.jpg", // Replace with your Figma exported image path
    description: "High-quality wireless headphones with active noise cancellation.",
    category: "Accessories",
    stock: 15
  },
  {
    name: "Smartphone Pro Max",
    price: 999.00,
    image: "/images/phone.jpg",
    description: "Latest 5G smartphone with incredible camera system.",
    category: "Smartphones",
    stock: 8
  },
  {
    name: "Ultra Slim Laptop",
    price: 1299.50,
    image: "/images/laptop.jpg",
    description: "Lightweight laptop perfect for professionals and students.",
    category: "Laptops",
    stock: 5
  }
];

const importData = async () => {
  try {
    await Product.deleteMany(); // Clear existing
    await Product.insertMany(sampleProducts);
    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

importData();