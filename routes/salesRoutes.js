import express from "express";
import { createSale, getSales, updateSale, deleteSale } from "../controllers/salesController.js";
import { protect, authorizeDepartments } from "../middleware/authMiddleware.js";

const r3 = express.Router();

r3.post("/", protect, authorizeDepartments("Sales", "Admin"), createSale);
r3.get("/", protect, authorizeDepartments("Sales", "Admin"), getSales);
r3.put("/:id", protect, authorizeDepartments("Sales", "Admin"), updateSale);
r3.delete("/:id", protect, authorizeDepartments("Sales", "Admin"), deleteSale);

export default r3;