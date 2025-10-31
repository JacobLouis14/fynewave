const { addToEmailQueue } = require("../jobs/email/emailSenderJob");
const newsletterModal = require("../models/newsletter");

const addEmailToNewsletterController = async (req, res) => {
  try {
    const { email } = req.body;

    // is email exists validation and inputting
    const emailIsExists = newsletterModal.findOne({ email: email });

    if (emailIsExists) {
      return res.status(400).json({ message: "email already exists" });
    }

    await newsletterModal.create({
      email: email,
    });

    res.status(200).json({ message: "successfully added" });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

const sendEmailController = async (req, res) => {
  try {
    const { mailContent, extraEmailsToSend, excludedMails } = req.body;
    console.log(req.body);

    addToEmailQueue(mailContent, extraEmailsToSend, excludedMails);

    res.status(200).json({ message: "emails will shortly send" });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

// list emails
const listEmailController = async (req, res) => {
  try {
    const emails = await newsletterModal.find();
    res.status(200).json({ message: "successfully", emails: emails });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

module.exports = {
  addEmailToNewsletterController,
  sendEmailController,
  listEmailController,
};
