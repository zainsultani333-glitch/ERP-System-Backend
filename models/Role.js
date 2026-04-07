import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  permissions: {
    create: Boolean,
    read: Boolean,
    update: Boolean,
    delete: Boolean
  },
  description: String
}, { timestamps: true });

export default mongoose.model("Role", roleSchema);