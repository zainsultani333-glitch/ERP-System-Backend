import mongoose from "mongoose";

const schema6 = new mongoose.Schema(
  {
    relatedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      unique: true, // 🔥 ONE DOCUMENT PER EMPLOYEE
    },

    resume: String,
    cnicFront: String,
    cnicBack: String,

    education: [String],   // multiple files allowed
    experience: [String],

    passportPhoto: String,

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    onModel: {
      type: String,
      default: "Employee",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Document", schema6);