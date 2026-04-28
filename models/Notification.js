import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    message: String,
    read: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);