import express from "express";
import {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
  deleteSupplier
} from "../controllers/supplierController.js";
import { protect, authorizeDepartments } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔐 Only Admin or Accounts can manage suppliers
router.post("/", protect, authorizeDepartments("Admin", "Accounts"), createSupplier);
router.get("/", protect, authorizeDepartments("Admin", "Accounts"), getSuppliers);
router.get("/:id", protect, authorizeDepartments("Admin", "Accounts"), getSupplierById);
router.put("/:id", protect, authorizeDepartments("Admin", "Accounts"), updateSupplier);
router.delete("/:id", protect, authorizeDepartments("Admin", "Accounts"), deleteSupplier);

export default router;