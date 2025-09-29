// server.mjs
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { connectDB } from "./lib/db.js";
import userrouter from "./routes/userroute.js";
import messageRoutes from "./routes/messageRoute.js";
import { server } from 'socket.io'

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);

// Initialize socket.io
export const io = new Server(server, {
  cors: {
    origin: "*", // in production, put your frontend URL
    methods: ["GET", "POST"]
  }
});

// Online users map: userId → socketId
const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // When user logs in, send their userId
  socket.on("addUser", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log("Online users:", onlineUsers);
  });

  // Listen for sending messages
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

  // Disconnect
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

// Middleware
app.use(cors());
app.use(express.json({ limit: "4mb" }));
app.use("/api/auth", userrouter);     // Route setup
app.use("/api/messages", messageRoutes)

// Example route
app.get("/", (req, res) => {
  res.json({ message: "Server running with ES6 modules 🚀" });
});

// Connting mongodb
await connectDB();

// Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});


