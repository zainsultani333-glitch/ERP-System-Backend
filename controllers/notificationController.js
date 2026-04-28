import Notification from "../models/Notification.js";

// 🔹 GET ONLY (READ ONLY SYSTEM)
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .populate("user", "name email");

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};