const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  applyForJob,
  getMyApplications
} = require("../controllers/applicationController");

// Apply for  job
router.post("/", protect, applyForJob);

// Get my applications
router.get("/my", protect, getMyApplications);

module.exports = router;