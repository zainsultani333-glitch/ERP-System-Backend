import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: String,
  contactPerson: String,
  phone: String,
  email: String,
  address: String,
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Supplier", supplierSchema);