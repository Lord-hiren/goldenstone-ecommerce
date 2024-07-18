const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(newOrder);

router.route("/order/:id").get(getSingleOrder);

router.route("/orders/me").post(myOrders);

router.route("/admin/orders").get(getAllOrders);

router.route("/admin/order/:id").put(updateOrder).delete(deleteOrder);

module.exports = router;
