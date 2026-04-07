import mongoose from "mongoose";

const schema6 = new mongoose.Schema({
  title: String,
  fileUrl: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  relatedTo: { type: mongoose.Schema.Types.ObjectId, refPath: "onModel" },
  onModel: { type: String, enum: ["Employee", "Product", "Purchase", "Sale"] }
});

export default mongoose.model("Document", schema6);