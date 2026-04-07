import express from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../controllers/categoryController.js";
import { protect, authorizeDepartments } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeDepartments("Admin"), createCategory);
router.get("/", protect, authorizeDepartments("Admin"), getCategories);
router.get("/:id", protect, authorizeDepartments("Admin"), getCategoryById);
router.put("/:id", protect, authorizeDepartments("Admin"), updateCategory);
router.delete("/:id", protect, authorizeDepartments("Admin"), deleteCategory);

export default router;