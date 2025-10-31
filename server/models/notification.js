const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: String,
  message: String,
  read: Boolean,
  createdAt: { type: Date, default: Date.now },
});

const NotificationModel = mongoose.model("Notification", notificationSchema);
module.exports = NotificationModel;
