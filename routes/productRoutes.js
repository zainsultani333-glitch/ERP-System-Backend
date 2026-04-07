import express from "express";
import { createProduct, getProducts, updateProduct, deleteProduct } from "../controllers/productController.js";
import { protect, authorizeDepartments } from "../middleware/authMiddleware.js";

const productRouter = express.Router();

// Protected routes
productRouter.post("/", protect, authorizeDepartments("Sales", "Admin"), createProduct);
productRouter.get("/", protect, authorizeDepartments("Sales", "Admin"), getProducts);
productRouter.put("/:id", protect, authorizeDepartments("Sales", "Admin"), updateProduct);
productRouter.delete("/:id", protect, authorizeDepartments("Sales", "Admin"), deleteProduct);

export default productRouter;