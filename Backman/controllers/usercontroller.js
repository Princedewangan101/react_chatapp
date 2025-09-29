// Sign-up new user
import { User } from "../models/user.js";
import bcrypt from "bcrypt";



// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { fullname, email, password, bio, profilePic } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "Please provide fullname, email, and password" });
        }

        // Check if user exists
        const User = await User.findOne({ email });
        if (User) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            bio,
        });

        const token = generateToken(newUser._id);

        res.status(201).json({
            message: "User registered successfully",
            userData: {
                id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic,
                bio: newUser.bio,
            },
            token,
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Login a user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate token
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

//Controller to check if user is authentication
export const checkAuth = (req, res) => {
    res.json({ succes: true, user: req.user });
};

// Update user profile
export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;
        
        // Hash new password if provided
        if (updates.password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(updates.password, salt);
        }
        
        const updatedUser = await User.findByIdAndUpdate(userId, updates, {
            new: true,
        }).select("-password");
        
        res.status(200).json({ message: "Profile updated", user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all users (excluding passwords)
export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
