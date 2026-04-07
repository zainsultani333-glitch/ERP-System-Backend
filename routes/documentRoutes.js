import express from "express";
import { uploadDoc, getDocs, updateDoc, deleteDoc } from "../controllers/documentController.js";
import { protect, authorizeDepartments } from "../middleware/authMiddleware.js";

const r5 = express.Router();

r5.post("/", protect, authorizeDepartments("HR", "Accounts", "Admin"), uploadDoc);
r5.get("/", protect, authorizeDepartments("HR", "Accounts", "Admin"), getDocs);
r5.put("/:id", protect, authorizeDepartments("HR", "Accounts", "Admin"), updateDoc);
r5.delete("/:id", protect, authorizeDepartments("HR", "Accounts", "Admin"), deleteDoc);

export default r5;