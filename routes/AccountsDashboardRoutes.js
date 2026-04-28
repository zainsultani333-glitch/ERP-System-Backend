import express from "express";
import { getDashboardData } from "../controllers/AccountsDashboardController.js";

const router = express.Router();

router.get("/", getDashboardData);

export default router;