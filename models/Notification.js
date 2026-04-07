import mongoose from "mongoose";

const schema7 = new mongoose.Schema({
  message: String,
  read: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } // To send to a specific user
});

export default mongoose.model("Notification", schema7);