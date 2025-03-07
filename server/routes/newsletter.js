const express = require("express");
const router = express.Router();
const {
  addEmailToNewsletterController,
  sendEmailController,
} = require("../controllers/newsletter");

// recieving email  for newsletter
router.post("/add-email-to-newsletter", addEmailToNewsletterController);

// send mail
router.post("/send-email-to-newsletter-subscribers", sendEmailController);

module.exports = router;
