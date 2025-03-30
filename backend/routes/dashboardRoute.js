const express = require("express");
const {
  getDashboardStats,
  getSalesChartData,
  getOrdersChartData,
  getStockStatusData,
} = require("../controllers/dashboardController");
const { authenticateAdminToken } = require("../middleware/adminAuth");

const router = express.Router();

// All routes are protected with admin authentication
router.use(authenticateAdminToken);

router.route("/stats").get(getDashboardStats);
router.route("/sales-chart").get(getSalesChartData);
router.route("/orders-chart").get(getOrdersChartData);
router.route("/stock-status").get(getStockStatusData);

module.exports = router;
