const newsletterModal = require("../models/newsletter");
const nodemailer = require("nodemailer");

// nodemailer config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "info.lynchpinapp@gmail.com",
    pass: process.env.GOOGLE_PASSKEY,
  },
});

const addEmailToNewsletterController = async (req, res) => {
  try {
    const { email } = req.body;

    // is email exists validation and inputting
    const updatedNewsletter = await newsletterModal.findOneAndUpdate(
      { for: "newsletter" },
      {
        $addToSet: { emails: email },
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).json({ message: "successfully added" });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

const sendEmailController = async (req, res) => {
  try {
    const { mailContent, extraEmailsToSend } = req.body;

    let mailsToSend = [];

    const newsletterData = await newsletterModal.findOne({
      for: "newsletter",
    });

    mailsToSend = [...extraEmailsToSend, ...newsletterData.emails];

    if (mailsToSend.length < 1)
      return res.status(400).json({ message: "no mails to send" });

    for (const mail of mailsToSend) {
      const mailOptions = {
        from: "info.lynchpinapp@gmail.com",
        to: `${mail}`,
        subject: `${mailContent.subject}`,
        text: `${mailContent.content}`,
      };

      const transporterResponse = await transporter.sendMail(mailOptions);
    }
    res.status(200).json({ message: "mails sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

module.exports = {
  addEmailToNewsletterController,
  sendEmailController,
};
