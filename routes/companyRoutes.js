import express from "express";
import { createCompany, getCompanies, getCompanyById, updateCompany, deleteCompany } from "../controllers/companyController.js";
import { protect, authorizeDepartments } from "../middleware/authMiddleware.js";

const companyRouter = express.Router();

// Protected routes - only Admin
companyRouter.post("/", protect, authorizeDepartments("Admin"), createCompany);
companyRouter.get("/", protect, authorizeDepartments("Admin"), getCompanies);
companyRouter.get("/:id", protect, authorizeDepartments("Admin"), getCompanyById);
companyRouter.put("/:id", protect, authorizeDepartments("Admin"), updateCompany);
companyRouter.delete("/:id", protect, authorizeDepartments("Admin"), deleteCompany);

export default companyRouter;