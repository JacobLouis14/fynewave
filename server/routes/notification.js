const express = require("express");
const { getNotification } = require("../controllers/notification");
const router = express.Router();

// get notifications
router.get("/get-notifications/:id", getNotification);

module.exports = router;
