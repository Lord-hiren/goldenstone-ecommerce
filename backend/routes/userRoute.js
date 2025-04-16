const express = require("express");
const {
  googleLogin,
  logout,
  getUserDetails,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
  adminLogin,
  adminLogout,
  getAdminProfile,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { authenticateAdminToken } = require("../middleware/adminAuth");

const router = express.Router();

router.route("/googlelogin").post(googleLogin);
router.route("/logout").get(logout);
router.route("/me").post(getUserDetails);
// Admin routes
router.route("/admin/login").post(adminLogin);
router.route("/admin/logout").post(authenticateAdminToken, adminLogout);
router.route("/admin/profile").get(authenticateAdminToken, getAdminProfile);

// Protected admin routes
router.route("/admin/users").post(authenticateAdminToken, getAllUser);
router.route("/admin/user/:id").post(authenticateAdminToken, deleteUser);

module.exports = router;
