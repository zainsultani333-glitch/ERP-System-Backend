import mongoose from "mongoose";

const schema3 = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  description: String, // Product description
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" }, // Link to Supplier
  sku: String, // Stock Keeping Unit
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Product", schema3);