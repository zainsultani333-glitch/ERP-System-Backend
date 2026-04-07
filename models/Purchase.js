import mongoose from "mongoose";

const schema5 = new mongoose.Schema({
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: Number,
    price: Number
  }],
  total: Number,
  purchaseDate: { type: Date, default: Date.now }
});

export default mongoose.model("Purchase", schema5);