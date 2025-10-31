const NotificationModel = require("../models/notification");

const getNotification = async (req, res) => {
  try {
    const userId = req.params.id;

    const notifications = await NotificationModel.find({
      userId: userId,
    });

    res.status(200).json({
      message: "success",
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

module.exports = {
  getNotification,
};
