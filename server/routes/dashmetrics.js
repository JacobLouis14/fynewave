const express = require("express");
const {
  getCategoryMetrics,
  dashboardCard,
} = require("../controllers/dashboardMetrics");
const router = express.Router();

// DASHBOARD CARDS
router.get("/get-dashboard-cards", dashboardCard);

// category metrics
router.get("/get-category-metrics", getCategoryMetrics);

module.exports = router;
