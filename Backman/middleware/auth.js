import { User } from "../models/user";
import jwt from "jsonwebtoken";

// Middleware to protect routes
export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.headers.token;
    
    const user = await User.findById()
  } catch (err) {
    
  }
}
