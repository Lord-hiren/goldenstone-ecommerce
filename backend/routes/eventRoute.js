const express = require("express");
const {
  createEvent,
  getAllEvents,
  getEventDetails,
  updateEvent,
  deleteEvent,
  getActiveEvents,
} = require("../controllers/eventController");
const { authenticateAdminToken } = require("../middleware/adminAuth");

const router = express.Router();

// Public routes
router.route("/active").get(getActiveEvents);

// Admin routes - protected with admin authentication
router.route("/admin/events").get(authenticateAdminToken, getAllEvents);
router.route("/admin/event/new").post(authenticateAdminToken, createEvent);
router
  .route("/admin/event/:id")
  .get(authenticateAdminToken, getEventDetails)
  .put(authenticateAdminToken, updateEvent)
  .delete(authenticateAdminToken, deleteEvent);

module.exports = router;
