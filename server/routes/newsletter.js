const express = require("express");
const router = express.Router();
const {
  addEmailToNewsletterController,
  sendEmailController,
  listEmailController,
} = require("../controllers/newsletter");
const {
  checkIsAuthorized,
  checkIsAdmin,
} = require("../middlewares/isAuthorized");

// recieving email  for newsletter
router.post("/add-email-to-newsletter", addEmailToNewsletterController);

// send mail
router.post(
  "/send-email-to-newsletter-subscribers",
  checkIsAuthorized,
  checkIsAdmin,
  sendEmailController
);

// list email
router.get(
  "/list-emails",
  checkIsAuthorized,
  checkIsAdmin,
  listEmailController
);

module.exports = router;
