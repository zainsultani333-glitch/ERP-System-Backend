import Notification from "../models/Notification.js";

// Create a new notification
export const createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.json(notification);
  } catch (error) {
    res.status(500).json({ msg: "Error creating notification", error: error.message });
  }
};

// Get all notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching notifications", error: error.message });
  }
};

// Update a notification
export const updateNotification = async (req, res) => {
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return the updated document
    );
    res.json(updatedNotification);
  } catch (error) {
    res.status(500).json({ msg: "Error updating notification", error: error.message });
  }
};

// Delete a notification
export const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ msg: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting notification", error: error.message });
  }
};