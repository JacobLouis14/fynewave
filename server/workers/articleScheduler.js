require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const {
  articlePublishQueue,
} = require("../jobs/article_scheduler/schedulePublish");
const articleModel = require("../models/article");
const { dbConnectionHandler } = require("../utils/connection_db");

console.log(`article publish scheduler running...`);

// DATABASE CONNECTION
const connectDatabase = async () => await dbConnectionHandler();
connectDatabase();

// PROCESS
articlePublishQueue.process(async (job) => {
  const { articleId } = job.data;
  const article = await articleModel.findById(articleId);

  if (!articleId) {
    done(new Error("article not found"));
  }

  if (article.status === "scheduled") {
    article.status = "published";
    article.publishedAt = new Date();
    await article.save();
  }
  return `Article schedule completed: ${articleId}`;
});

articlePublishQueue.on("failed", async (job, err) => {
  const { articleId } = job.data;
  console.log(`error on executing scheduled article: ${err.message}`);

  try {
    await articleModel.findByIdAndUpdate(articleId, {
      status: "pending",
    });
    console.log(`🔁 Article ${articleId} set back to pending`);
  } catch (error) {
    console.error(`Failed to revert article ${articleId}: ${error.message}`);
  }
});

articlePublishQueue.on("completed", (job, result) => {
  console.log(`article schedule successfully completed: ${job.data.articleId}`);
});
