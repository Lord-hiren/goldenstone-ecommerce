const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getSingleOrderAdmin,
} = require("../controllers/orderController");
const router = express.Router();

const { authenticateAdminToken } = require("../middleware/adminAuth");

router.route("/order/new").post(newOrder);

router.route("/order/:id").get(getSingleOrder);

router.route("/orders/me").post(myOrders);

router.route("/admin/orders").post(authenticateAdminToken, getAllOrders);

router
  .route("/admin/get/order/:id")
  .post(authenticateAdminToken, getSingleOrderAdmin);
router
  .route("/admin/update/order/:id")
  .post(authenticateAdminToken, updateOrder);
// router.route("/admin/order/:id").post(updateOrder).delete(deleteOrder);

module.exports = router;
