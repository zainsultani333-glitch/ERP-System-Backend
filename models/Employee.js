import mongoose from "mongoose";

const schema2 = new mongoose.Schema({
  name: String,
  cnic: String,
  phone: String,
  department: String,
  designation: String,
  email: { type: String, unique: true }, // For login
  salary: Number,
  dateOfJoining: Date,
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Employee", schema2);