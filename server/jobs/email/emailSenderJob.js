const Queue = require("bull");

const redisUrl = process.env.REDIS_URL;
const redisPort = process.env.REDIS_PORT;
const sendEmailQueue = new Queue("send-email", {
  redis: { host: redisUrl, port: redisPort },
});

const addToEmailQueue = (mailContent, extraEmailsToSend, excludedMails) => {
  return sendEmailQueue.add(
    {
      mailContent,
      excludedMails,
      extraEmailsToSend,
    },
    {
      attempts: 2,
      backoff: {
        type: "exponential",
        delay: 2000,
      },
      removeOnComplete: {
        age: 24 * 3600,
        count: 1000,
      },
      removeOnFail: {
        age: 48 * 3600,
      },
    }
  );
};

module.exports = {
  sendEmailQueue,
  addToEmailQueue,
};
