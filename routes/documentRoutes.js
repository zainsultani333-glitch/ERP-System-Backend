import express from "express";
import { uploadMultipleDocs, getDocs, updateDoc, deleteDoc } from "../controllers/documentController.js";
import { protect, authorizeDepartments } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const r5 = express.Router();

r5.post("/", upload.fields([
    { name: "Resume", maxCount: 1 },
    { name: "CNIC_FRONT", maxCount: 1 },
    { name: "CNIC_BACK", maxCount: 1 },
    { name: "Education", maxCount: 5 },
    { name: "Experience", maxCount: 5 },
    { name: "PassportPhoto", maxCount: 1 },
]), protect, authorizeDepartments("HR", "Accounts", "Admin"), uploadMultipleDocs);
r5.get("/", protect, authorizeDepartments("HR", "Accounts", "Admin"), getDocs);
r5.put("/:id", protect, authorizeDepartments("HR", "Accounts", "Admin"), updateDoc);
r5.delete("/:id", protect, authorizeDepartments("HR", "Accounts", "Admin"), deleteDoc);

export default r5;