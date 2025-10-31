const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  checkIsAuthorized,
  checkIsAdmin,
} = require("../middlewares/isAuthorized");
const {
  createArticleController,
  getArticleController,
  getArticleByIdController,
  updateArticleController,
  deleteArticleController,
  softDeleteArticleController,
  restoreSoftDeleted,
  updateArticleScheduledTime,
  saveAsDraftController,
  updateDraftToPublished,
  reviewContentWriterArticle,
} = require("../controllers/articles/dashboard");
const {
  latestBlogController,
  otherBlogsController,
  getArticleDataBySlugController,
  getArticleForSitemapController,
  getArticleFrontendController,
} = require("../controllers/articles/frontend");

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

///////////////////////////////// dashboard ////////////////////////////////////

// creating new article route
router.post(
  "/add-new-article",
  checkIsAuthorized,
  upload.fields(articleUploadArray),
  createArticleController
);

// get article
router.get("/get-articles", checkIsAuthorized, getArticleController);

// get article by ID
router.get("/get-articleById/:id", checkIsAuthorized, getArticleByIdController);

// update article
router.put(
  "/update-article/:articleId",
  checkIsAuthorized,
  upload.fields(articleUploadArray),
  updateArticleController
);

// delete article route
router.delete(
  "/delete-article/:id",
  checkIsAuthorized,
  checkIsAdmin,
  deleteArticleController
);
router.delete(
  "/soft-delete-article/:id",
  checkIsAuthorized,
  checkIsAdmin,
  softDeleteArticleController
);

// restore from delete
router.put(
  "/restore-article/:id",
  checkIsAuthorized,
  checkIsAdmin,
  restoreSoftDeleted
);

// save article as draft
router.post(
  "/save-article-as-draft",
  checkIsAuthorized,
  upload.fields(articleUploadArray),
  saveAsDraftController
);

// update article from draft to publish
router.put(
  "/update-article-to-publish",
  checkIsAuthorized,
  checkIsAdmin,
  updateDraftToPublished
);

// review article and status update
router.put(
  "/article-reviewed",
  checkIsAuthorized,
  checkIsAdmin,
  reviewContentWriterArticle
);

// update article scheduled time
router.put(
  "/article-scheduledtime-update/:articleId",
  checkIsAuthorized,
  checkIsAdmin,
  updateArticleScheduledTime
);

///////////////////////////////////////////// frontend /////////////////////////////////////////

// get article
router.get("/get-articles-on-view", getArticleFrontendController);

// get latest article
router.get("/get-latest-article", latestBlogController);

// get oter articles
router.get("/get-other-articles", otherBlogsController);

// get article post data by slug
router.get(
  "/get-article-post-data-by-slug/:slug",
  getArticleDataBySlugController
);

/////////////////////////////////////////////// Other //////////////////////////////////////////

// for sitemap
router.get("/get-article-for-sitemap", getArticleForSitemapController);

module.exports = router;
