const jwt = require("jsonwebtoken");
const { verifyAdminToken } = require("../utils/adminToken");

// Middleware to authenticate admin token
exports.authenticateAdminToken = (req, res, next) => {
  try {
    let token;

    // Check for token in cookie first
    if (req.cookies.adminToken) {
      token = req.cookies.adminToken;
    }
    // Fallback to Authorization header
    else if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login to access this resource",
      });
    }

    // Verify token
    const decoded = verifyAdminToken(token);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Check if user is admin
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only resource.",
      });
    }

    // Add user info to request
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};
