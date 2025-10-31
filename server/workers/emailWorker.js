require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});
const nodemailer = require("nodemailer");
const { sendEmailQueue } = require("../jobs/email/emailSenderJob");
const newsletterModal = require("../models/newsletter");
const { dbConnectionHandler } = require("../utils/connection_db");

// nodemailer config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "info.lynchpinapp@gmail.com",
    pass: process.env.GOOGLE_PASSKEY,
  },
});

// DATABASE CONNECTION
const connectDatabase = async () => await dbConnectionHandler();
connectDatabase();

console.log(`email worker running.....`);

// Constants
const BATCH_SIZE = 50;

// email sending proccess
sendEmailQueue.process(async (job) => {
  const { mailContent, extraEmailsToSend, excludedMails } = job.data;

  const cursor = newsletterModal.find({}, { email: 1 }).cursor();

  const filteredEmails = new Set(extraEmailsToSend);

  for await (const doc of cursor) {
    if (!excludedMails.includes(doc.email)) {
      filteredEmails.add(doc.email);
    }
  }

  const emailsArray = Array.from(filteredEmails);

  if (emailsArray.length === 0) {
    throw new Error("No emails to send");
  }

  console.log(
    `Sending ${emailsArray.length} emails in batches of ${BATCH_SIZE}...`
  );

  for (let i = 0; i < emailsArray.length; i += BATCH_SIZE) {
    const batch = emailsArray.slice(i, i + BATCH_SIZE);

    const results = await Promise.allSettled(
      batch.map((email) =>
        transporter.sendMail({
          from: "info.lynchpinapp@gmail.com",
          to: email,
          subject: mailContent.subject,
          text: mailContent.content,
        })
      )
    );

    results.forEach((result, idx) => {
      if (result.status === "fulfilled") {
        console.log(`✅ Sent to ${batch[idx]}`);
      } else {
        console.error(`❌ Failed to send to ${batch[idx]}:`, result.reason);
      }
    });
  }
});

// on complete
sendEmailQueue.on("completed", (job) => {
  const { mailContent } = job.data;

  console.log(
    `send email process on subject ${mailContent.subject} has completed`
  );
});

// on fail
sendEmailQueue.on("failed", (job, error) => {
  const { mailContent } = job.data;

  console.log(
    `send email process on subject ${mailContent.subject} has failed`
  );
  console.log(error);
});
