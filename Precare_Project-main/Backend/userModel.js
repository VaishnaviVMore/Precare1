// backend/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // only for email/password users
  photo: String,
  provider: { type: String, default: "local" },
  providerId: String,
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
