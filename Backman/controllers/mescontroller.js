import { Message } from "../models/message.js";
import { User } from "../models/user.js";
import cloudinary from '../lib/cloudinary.js'
import { io, onlineUsers } from "../app.js";

// ✅ Get user fron sidebar read only
export const getUserFromSidebar = async (req, res) => {
    try {
        const { userId } = req.params; // <-- ID of user clicked in sidebar
        const myId = req.user._id;     // <-- logged-in user (from protectedRoute)

        // Find messages where:
        // (I sent to them) OR (they sent to me)
        const messages = await Message.find({
            $or: [
                { sender: myId, receiver: userId },
                { sender: userId, receiver: myId },
            ],
        })
            .sort({ createdAt: 1 }); // oldest to newest

        // Mark all messages FROM the other user TO me as read
        await Message.updateMany(
            { sender: userId, receiver: myId, isRead: false },
            { $set: { isRead: true } }
        );

        res.status(200).json(messages);
    } catch (error) {
        console.error("Get conversation error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Get conversation between logged-in user and another user
export const getMessages = async (req, res) => {
    try {
        const { userId } = req.params; // id of the other user
        
        const messages = await Message.find({
            $or: [
                { sender: req.user._id, receiver: userId },
                { sender: userId, receiver: req.user._id },
            ],
        }).sort({ createdAt: 1 }); // oldest → newest
        
        res.status(200).json(messages);
    } catch (error) {
        console.error("Get messages error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Mark messages as read
export const markAsRead = async (req, res) => {
    try {
        const { userId } = req.params; // mark messages from this user as read
        
        await Message.updateMany(
            { sender: userId, receiver: req.user._id, isRead: false },
            { $set: { isRead: true } }
        );
        
        res.status(200).json({ message: "Messages marked as read" });
    } catch (error) {
        console.error("Mark as read error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Delete a message (only sender can delete)
export const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        
        const message = await Message.findById(messageId);
        
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }
        
        if (message.sender.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this message" });
        }
        
        await message.deleteOne();
        
        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        console.error("Delete message error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Send a message
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, content, type } = req.body;

    let mediaUrl;
    if (req.file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload_stream(
        { folder: "chatapp" },
        (error, result) => {
          if (error) throw error;
          mediaUrl = result.secure_url;
        }
      ).end(req.file.buffer);
    }

    const newMessage = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      content: content || "",
      type: type || (req.file ? "image" : "text"),
      mediaUrl,
    });

    // Emit to receiver if online
    const receiverSocket = onlineUsers.get(receiverId);
    if (receiverSocket) {
      io.to(receiverSocket).emit("getMessage", {
        senderId: req.user._id,
        content: newMessage.content,
        type: newMessage.type,
        mediaUrl: newMessage.mediaUrl,
        createdAt: newMessage.createdAt,
      });
    }

    res.status(201).json({ message: "Message sent", data: newMessage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};