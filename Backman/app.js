// server.mjs
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
// import { Server } from "socket.io";
import { connectDB } from "./lib/db.js";
import router from "./routes/userroute.js";

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);

// Middleware
app.use(cors());
app.use(express.json({limit: "4mb"}));
app.use("/api/auth", router);     // Route setup


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


