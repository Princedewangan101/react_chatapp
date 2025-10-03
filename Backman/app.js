// server.mjs
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { connectDB } from "./lib/db.js";
import userrouter from "./routes/userroute.js";
import messageRoutes from "./routes/messageRoute.js";
import { Server } from 'socket.io'

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);

// Middleware
app.use(cors());
app.use(express.json({ limit: "4mb" }));
app.use("/api/auth", userrouter);     // Route setup
app.use("/api/messages", messageRoutes)     // Route setup

// Example route
app.get("/", (req, res) => {
  res.json({ message: "Server running with ES6 modules 🚀" });
});

// Connting mongodb
await connectDB();

// Initialize socket.io
export const io = new Server(httpServer, {
  cors: {
    origin: "*", // in production, put your frontend URL
    methods: ["GET", "POST"]
  }
});

// Online users map: {userId : socketId}, Socket handling func.
export const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

// 1️⃣ Add user to online users
  socket.on("addUser", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log("Online users:", onlineUsers);
  });

// 2️⃣ Send message to a specific user
  socket.on("sendMessage", ({ senderId, receiverId, content, type, mediaUrl }) => {
    const receiverSocket = onlineUsers.get(receiverId);
    if (receiverSocket) {
      io.to(receiverSocket).emit("getMessage", {
        senderId,
        content,
        type,
        mediaUrl,
        createdAt: new Date()
      });
    }
  });

// 3️⃣ Optional: notify when user disconnects
  socket.on("disconnect", () => {
    for (let [key, value] of onlineUsers) {
      if (value === socket.id) {
        onlineUsers.delete(key);
        break;
      }
    }
    console.log("User disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});