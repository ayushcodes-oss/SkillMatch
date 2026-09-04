const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  applyForJob,
  getMyApplications,
  getRecruiterApplications,
  updateApplicationStatus
} = require("../controllers/applicationController");

// Apply for  job
router.post("/", protect, applyForJob);

// Get my applications
router.get("/my", protect, getMyApplications);

// Get applications for my jobs
router.get("/recruiter", protect, getRecruiterApplications);

router.put("/:id/status", protect, updateApplicationStatus);

module.exports = router;