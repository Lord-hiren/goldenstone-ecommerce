const express = require("express");
const {
  googleLogin,
  logout,
  getUserDetails,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/googlelogin").post(googleLogin);
router.route("/logout").get(logout);
router.route("/me").post(getUserDetails);
router.route("/admin/users").get(getAllUser);
router
  .route("/admin/user/:id")
  .get(getSingleUser)
  .put(updateUserRole)
  .delete(deleteUser);

module.exports = router;
