import express from "express";
import { createPurchase, getPurchases, updatePurchase, deletePurchase } from "../controllers/purchaseController.js";
import { protect, authorizeDepartments } from "../middleware/authMiddleware.js";

const r4 = express.Router();

r4.post("/", protect, authorizeDepartments("Accounts", "Admin"), createPurchase);
r4.get("/", protect, authorizeDepartments("Accounts", "Admin"), getPurchases);
r4.put("/:id", protect, authorizeDepartments("Accounts", "Admin"), updatePurchase);
r4.delete("/:id", protect, authorizeDepartments("Accounts", "Admin"), deletePurchase);

export default r4;