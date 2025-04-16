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
// router.use(authenticateAdminToken);

router.route("/stats").post(authenticateAdminToken, getDashboardStats);
router.route("/sales-chart").post(authenticateAdminToken, getSalesChartData);
router.route("/orders-chart").post(authenticateAdminToken, getOrdersChartData);
router.route("/stock-status").post(authenticateAdminToken, getStockStatusData);

module.exports = router;
