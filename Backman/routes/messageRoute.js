import express from 'express'
import { protectedRoute } from '../middleware/auth.js';
import { deleteMessage, getMessages, getUserFromSidebar, markAsRead, sendMessage } from '../controllers/mescontroller.js';

const messagerouter = express.Router();

messagerouter.get("/user", protectedRoute, getUserFromSidebar)
messagerouter.get("/:id", protectedRoute, getMessages)
messagerouter.put("/:id", protectedRoute, markAsRead)
messagerouter.post("/:id", protectedRoute, sendMessage)
messagerouter.put("/:id", protectedRoute, deleteMessage)

// Use `upload.single("file")` to accept one file with field name "file"
messagerouter.post("/", protectedRoute, upload.single("file"), sendMessage);

export default messagerouter;