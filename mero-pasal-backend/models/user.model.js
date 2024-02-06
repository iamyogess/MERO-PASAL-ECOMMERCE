import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    role: { type: Boolean, default: false },
    answer: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("users", userSchema);
