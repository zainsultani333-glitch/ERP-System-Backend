import express from "express";
import { createEmployee, getEmployees, updateEmployee, deleteEmployee } from "../controllers/employeeController.js";
import { protect, authorizeDepartments } from "../middleware/authMiddleware.js";

const r1 = express.Router();

r1.post("/", protect, authorizeDepartments("HR", "Admin"), createEmployee);
r1.get("/", protect, authorizeDepartments("HR", "Admin"), getEmployees);
r1.put("/:id", protect, authorizeDepartments("HR", "Admin"), updateEmployee);
r1.delete("/:id", protect, authorizeDepartments("HR", "Admin"), deleteEmployee);

export default r1;