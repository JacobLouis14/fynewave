require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const {
  deleteArticleQueue,
} = require("../jobs/article_delete/deleteArticleJob");
const articleModel = require("../models/article");
const {
  deleteImagesFromS3Bucket,
  deleteImageFromBucket,
} = require("../utils/aws_s3");
const { dbConnectionHandler } = require("../utils/connection_db");

console.log(`article delete scheduler running...`);

// DATABASE CONNECTION
const connectDatabase = async () => await dbConnectionHandler();
connectDatabase();

// PROCESS
deleteArticleQueue.process(async (job) => {
  const { articleId } = job.data;
  const article = await articleModel.findById(articleId);

  if (!articleId) {
    done(new Error("article not found"));
  }

  if (article.status === "deleted") {
    // delete image from s3
    await deleteImagesFromS3Bucket(article.thumbnail, article.banner);
    if (article.articleContentImage) {
      await deleteImageFromBucket(article.articleContentImage);
    }
    await articleModel.findByIdAndDelete(articleId);
  }
  return `Article delete completed: ${articleId}`;
});

deleteArticleQueue.on("failed", async (job, err) => {
  const { articleId } = job.data;
  console.error(
    `error on executing deletion of article: ${articleId}, error: ${err.message}`
  );
});

deleteArticleQueue.on("completed", (job, result) => {
  const { articleId } = job.data;
  console.log(`article delete successfully completed: ${articleId}`);
});
