import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,

  role: {
    type: String,
    default: "employee", // admin / hr / employee
  },

  active: { type: Boolean, default: true },

  // 🔥 NEW: permissions directly in user
  permissions: {
    create: { type: Boolean, default: false },
    read: { type: Boolean, default: true },
    update: { type: Boolean, default: false },
    delete: { type: Boolean, default: false },
  },
}, { timestamps: true });

export default mongoose.model("User", userSchema);