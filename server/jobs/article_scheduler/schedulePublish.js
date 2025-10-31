const Queue = require("bull");

const redisUrl = process.env.REDIS_URL;
const redisPort = process.env.REDIS_PORT;
const articlePublishQueue = new Queue("publish-article", {
  redis: { host: redisUrl, port: redisPort },
});

//  ADD SCHEDULE
const addArticleScheduleJob = (articleId, scheduleAt) => {
  const delay = new Date(scheduleAt).getTime() - Date.now();
  return articlePublishQueue.add({ articleId }, { delay, attempts: 2 });
};

// DELETE SCHEDULE
const deleteScheduledArticle = async (scheduledJobId) => {
  const job = await articlePublishQueue.getJob(scheduledJobId);
  await job.remove();
};

module.exports = {
  articlePublishQueue,
  addArticleScheduleJob,
  deleteScheduledArticle,
};
