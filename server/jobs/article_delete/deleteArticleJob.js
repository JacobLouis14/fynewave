const Queue = require("bull");

const redisUrl = process.env.REDIS_URL;
const redisPort = process.env.REDIS_PORT;

const deleteArticleQueue = new Queue("delete-article", {
  redis: { host: redisUrl, port: redisPort },
});

// ADD ARTICLE TO DELETE
const addArticleToDelete = (articleId, scheduleAt) => {
  const delay = new Date(scheduleAt).getTime() - Date.now();
  return deleteArticleQueue.add({ articleId }, { delay, attempts: 2 });
};

// CANCEL ARTICLE DELETION
const cancelArticleDeletion = async (deleteScheduledJobId) => {
  const job = await deleteArticleQueue.getJob(deleteScheduledJobId);
  await job.remove();
};

module.exports = {
  deleteArticleQueue,
  addArticleToDelete,
  cancelArticleDeletion,
};
