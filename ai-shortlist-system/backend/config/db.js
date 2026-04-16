const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // In a real application, replace with process.env.MONGO_URI and ensure the cluster is accessible.
    // For this mock, if the DB fails to connect, we'll continue so the server starts, 
    // but ideally we'd want a local MongoDB or a real Atlas string.
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("Database connection error:", err.message);
    // process.exit(1);
    console.warn("Continuing without DB for demonstration purposes if needed.");
  }
};

module.exports = connectDB;
