import Company from "../models/Company.js";
import User from "../models/User.js";
import Role from "../models/Role.js";
import Notification from "../models/Notification.js";

// ================= ADMIN DASHBOARD =================
export const getAdminDashboard = async (req, res) => {
  try {
    // ================= COUNTS =================
    const totalCompanies = await Company.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalRoles = await Role.countDocuments();
    const totalNotifications = await Notification.countDocuments();

    // ================= RECENT USERS (SAFE) =================
    const recentUsers = await User.find()
      .sort({ _id: -1 }) // safer than createdAt
      .limit(5);

    // ================= RECENT NOTIFICATIONS =================
    const recentNotifications = await Notification.find()
      .sort({ _id: -1 })
      .limit(5);

    // ================= RESPONSE =================
    res.json({
      summary: {
        totalCompanies,
        totalUsers,
        totalRoles,
        totalNotifications,
      },
      recentUsers,
      recentNotifications,
    });

  } catch (error) {
    console.log("🔥 ADMIN DASHBOARD ERROR:", error); // IMPORTANT

    res.status(500).json({
      msg: "Error loading admin dashboard",
      error: error.message,
    });
  }
};