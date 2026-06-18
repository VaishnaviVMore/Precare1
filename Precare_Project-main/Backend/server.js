// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
const app = express();

// ===============================
// Middleware
// ===============================
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// ===============================
// MongoDB Compass Connection
// ===============================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Compass connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ===============================
// Contact Schema & Model
// ===============================
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);

// ===============================
// USER SCHEMA & MODEL (NEW)
// ===============================
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // optional for Google users
  googleId: { type: String },
});

const User = mongoose.model("User", userSchema);

// ===============================
// REGISTER ROUTE (NEW)
// ===============================
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// ===============================
// LOGIN ROUTE (NEW)
// ===============================
app.post("/api/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (!user.password) {
      return res.status(400).json({ error: "Use Google login" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

// ===============================
// GOOGLE LOGIN ROUTE (NEW)
// ===============================
app.post("/api/google-login", async (req, res) => {
  try {
    const { username, email, googleId } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username,
        email,
        googleId,
      });
      await user.save();
    }

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Google login failed" });
  }
});

// ===============================
// Contact Form POST Route
// ===============================
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(200).json({ message: "Message saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save message." });
  }
});

// ===============================
// Test Route
// ===============================
app.get("/", (req, res) => res.send("✅ Backend running"));

// ===============================
// Start Server
// ===============================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));