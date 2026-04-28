import Notification from "../models/Notification.js";

export const createNotification = async ({ message, user = null }) => {
  try {
    await Notification.create({
      message,
      user,
      read: false,
    });
  } catch (err) {
    console.log("Notification Error:", err.message);
  }
};