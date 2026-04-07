import mongoose from "mongoose";

const schema4 = new mongoose.Schema({
  customer: String,
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: Number,
    price: Number
  }],
  total: Number,
  status: { type: String, default: "pending" }, // pending, completed, canceled
  saleDate: { type: Date, default: Date.now }
});

export default mongoose.model("Sale", schema4);