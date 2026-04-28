import express from "express";
import { getHRDashboard } from "../controllers/hrDashboardController.js";

const router = express.Router();

router.get("/", getHRDashboard);

export default router;