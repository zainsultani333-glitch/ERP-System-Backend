import express from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Create User (Admin only)
router.post("/", protect, authorizeRoles("admin"), createUser);

// 🔹 Get All Users (Admin only)
router.get("/", protect, authorizeRoles("admin"), getUsers);

// 🔹 Get Single User (Admin only)
router.get("/:id", protect, authorizeRoles("admin"), getUserById);

// 🔹 Update User (Admin only)
router.put("/:id", protect, authorizeRoles("admin"), updateUser);

// 🔹 Delete User (Admin only)
router.delete("/:id", protect, authorizeRoles("admin"), deleteUser);

export default router;