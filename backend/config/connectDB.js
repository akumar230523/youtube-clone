import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

// Connect to MongoDB.
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);     
        console.log("MongoDB connected successfully!"); 
    } 
    catch (error) {
        console.error("MongoDB connection failed: ", error.message);
        process.exit(1);
    }
};

export default connectDB;