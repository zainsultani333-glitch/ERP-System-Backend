import express from "express";
import { createNotification, getNotifications, updateNotification, deleteNotification } from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const r6 = express.Router();

r6.post("/", protect, createNotification);
r6.get("/", protect, getNotifications);
r6.put("/:id", protect, updateNotification);
r6.delete("/:id", protect, deleteNotification);

export default r6;