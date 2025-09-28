
import mongoose from "mongoose";


// MongoDB connection

export const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('✅ MongoDB connected');
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/Chatters`)
  } catch (err) {
        console.error("❌ MongoDB connection error:", err)
    }
}


