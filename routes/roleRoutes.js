import express from "express";
import { createRole, getRoles, getRoleById, updateRole, deleteRole } from "../controllers/roleController.js";
import { protect, authorizeDepartments } from "../middleware/authMiddleware.js";

const roleRouter = express.Router();

// Protect all role routes - only Admin
roleRouter.post("/", protect, authorizeDepartments("Admin"), createRole);
roleRouter.get("/", protect, authorizeDepartments("Admin"), getRoles);
roleRouter.get("/:id", protect, authorizeDepartments("Admin"), getRoleById);
roleRouter.put("/:id", protect, authorizeDepartments("Admin"), updateRole);
roleRouter.delete("/:id", protect, authorizeDepartments("Admin"), deleteRole);

export default roleRouter;