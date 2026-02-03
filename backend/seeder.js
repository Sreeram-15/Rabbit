const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const products = require("./Data/products");
const Cart=require('./models/Cart');
const Order=require('./models/Order');

dotenv.config();

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to seed data

const seedData = async () => {
  try {
    // Deleting existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();
    await Order.deleteMany();

    // Create a default admin user
    const createdUser = await User.create({
        name: "Admin User",
        email: "admin@example.com",
        password: "123456",
        role: "admin",
    });

    // Assign the default user ID to each product
    const userID=createdUser._id;

    const sampleproducts=products.map((product)=>({...product,user:userID}));
    
    // Insert the products into the database
    await Product.insertMany(sampleproducts);

    console.log("Product data seeded successfully!");
    await mongoose.connection.close();
    process.exit();
  } catch (error) {
    console.error("Error seeding the data ",error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedData();