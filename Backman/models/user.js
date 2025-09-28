// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: false,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true, // store hashed password
            minlength: 6,
        },
        profilePic: {
            type: String,
            default: "", // you can store Cloudinary URL
        },
        bio: {
            type: String,
        },
        isOnline: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // automatically adds createdAt and updatedAt
    }
);

export const User = mongoose.model("User", userSchema);