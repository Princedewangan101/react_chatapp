import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

// Middleware to protect routes
export const protectedRoute = async (req, res, next) => {
  try {
    
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.json({ sucess: false, message: "user not found"});
    req.user = user;

    next()

  } catch (err) {
    
  }
}
