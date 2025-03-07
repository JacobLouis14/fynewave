const express = require("express");
const {
  getCategoryMetrics,
  getShowcasesMetrics,
  getUsersMetrics,
} = require("../controllers/dashboardMetrics");
const router = express.Router();

// article metrics
router.get("/get-showcases-metrics", getShowcasesMetrics);

// category metrics
router.get("/get-category-metrics", getCategoryMetrics);

// user metrics
router.get("/get-user-metrics", getUsersMetrics);

module.exports = router;
