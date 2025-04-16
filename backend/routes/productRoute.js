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
const { authenticateAdminToken } = require("../middleware/adminAuth");
const upload = require("../middleware/fileUpload");

const router = express.Router();

// Public routes
router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getProductDetails);
router.route("/reviews").get(getProductReviews);

// Authenticated routes
router.route("/review").put(createProductReview);
router.route("/reviews").delete(deleteReview);

// Admin routes (protected)
// Admin routes (protected)
router.route("/admin/products").post(authenticateAdminToken, getAdminProducts);
router
  .route("/admin/product/new")
  .post(authenticateAdminToken, upload.array("images", 5), createProduct);
router
  .route("/admin/product/:id")
  .post(authenticateAdminToken, upload.array("images", 5), updateProduct)
  .delete(authenticateAdminToken, deleteProduct);

router
  .route("/admin/product/delete/:id")
  .post(authenticateAdminToken, deleteProduct);
module.exports = router;
