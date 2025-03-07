const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getCategoriesController,
  createCategoryController,
  deleteCategoryController,
} = require("../controllers/categories");

// multer config
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fieldSize: 4 * 1024 * 1024 },
});

// get categories
router.get("/get-categories", getCategoriesController);

// create category
router.post("/create-category", upload.none(), createCategoryController);

// delete category
router.delete("/delete-category/:id", deleteCategoryController);

module.exports = router;
