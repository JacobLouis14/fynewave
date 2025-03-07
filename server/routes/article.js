const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createArticleController,
  getArticleController,
  getArticleByIdController,
  updateArticleController,
  deleteArticleController,
  latestBlogController,
  otherBlogsController,
  getArticleDataBySlugController,
  getArticleForSitemapController,
} = require("../controllers/article");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fieldSize: 4 * 1024 * 1024 },
});

const articleUploadArray = [
  {
    name: "thumbnail",
    maxCount: 1,
  },
  {
    name: "banner",
    maxCount: 1,
  },
  {
    name: "articleContentImage",
    maxCount: 1,
  },
];

// creating new article route
router.post(
  "/add-new-article",
  upload.fields(articleUploadArray),
  createArticleController
);

// get article
router.get("/get-articles", getArticleController);

// get article by ID
router.get("/get-articleById/:id", getArticleByIdController);

// update article
router.put(
  "/update-article",
  upload.fields(articleUploadArray),
  updateArticleController
);

// delete article route
router.delete("/delete-article/:id", deleteArticleController);

// get latest article
router.get("/get-latest-article", latestBlogController);

// get oter articles
router.get("/get-other-articles", otherBlogsController);

// get article post data by slug
router.get(
  "/get-article-post-data-by-slug/:slug",
  getArticleDataBySlugController
);

// for sitemap
router.get("/get-article-for-sitemap", getArticleForSitemapController);

module.exports = router;
