import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "erp_documents",
    resource_type: "auto", // allows images + pdf
    allowed_formats: ["jpg", "png", "jpeg", "pdf"],
  },
});

// File filter (optional safety)
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and Images are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

export default upload;