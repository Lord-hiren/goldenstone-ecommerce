const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");

const router = express.Router();

// Public routes
router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getProductDetails);
router.route("/reviews").get(getProductReviews);

// Authenticated routes
router.route("/review").put(createProductReview);
router.route("/reviews").delete(deleteReview);

// Admin routes
router.route("/admin/products").get(getAdminProducts);

router.route("/admin/product/new").post(createProduct);

router.route("/admin/product/:id").put(updateProduct).delete(deleteProduct);

module.exports = router;
