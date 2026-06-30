// backend/server.js

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";


import chatbotRoutes from "./routes/chatbot.js";

dotenv.config();

const app = express();

// ===============================
// Middleware
// ===============================
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// ===============================
// MongoDB Connection
// ===============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Compass connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ===============================
// Contact Schema
// ===============================
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

// ===============================
// User Schema
// ===============================
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    default: null,
  },

  googleId: {
    type: String,
    default: null,
  },
});

const User = mongoose.model("User", userSchema);

// ===============================
// Register
// ===============================
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      message: "Registration successful",
      user,
    });
  } catch (err) {
    console.error("Register Error:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ===============================
// Login
// ===============================
app.post("/api/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    if (!user.password) {
      return res.status(400).json({
        error: "Use Google Login",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        error: "Invalid password",
      });
    }

    res.json({
      message: "Login successful",
      user,
    });
  } catch (err) {
    console.error("Login Error:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ===============================
// Google Login
// ===============================
app.post("/api/google-login", async (req, res) => {
  try {
    const { username, email, googleId } = req.body;

    if (!username || !email) {
      return res.status(400).json({
        error: "Username and Email are required",
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username,
        email,
        googleId,
      });

      await user.save();
    }

    res.json({
      message: "Google Login Successful",
      user,
    });
  } catch (err) {
    console.error("Google Login Error:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ===============================
// Contact
// ===============================
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = new Contact({
      name,
      email,
      message,
    });

    await contact.save();

    res.json({
      message: "Message saved successfully",
    });
  } catch (err) {
    console.error("Contact Error:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ===============================
// Chatbot Route
// ===============================
app.use("/api/chatbot", chatbotRoutes);

// ===============================
// Test Route
// ===============================
app.get("/", (req, res) => {
  res.send("✅ Backend Running");
});

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});