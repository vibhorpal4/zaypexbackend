import Notification from "../models/notificationModel.js";

export const getAllNotification = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ message: `Notifications loaded successfully`, notifications });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const readNotification = async (req, res) => {
  try {
    await Notification.updateMany(
      { isRead: false },
      {
        isRead: true,
      }
    );
    return res.status(201).json({ message: `Notification Readed` });
  } catch (error) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};
