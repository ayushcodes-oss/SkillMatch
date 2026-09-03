const express = require("express");
const router = express.Router();

const { protect, recruiterOnly } = require("../middleware/authMiddleware");

const {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob
} = require("../controllers/jobController");

// Create Job - Recruiter only
router.post("/", protect, recruiterOnly, createJob);

// Get All Jobs - Students + Recruiters
router.get("/", protect, getJobs);

// Get Single Job
router.get("/:id", protect, getJob);

// Update Job - Recruiter only
router.put("/:id", protect, recruiterOnly, updateJob);

// Delete Job - Recruiter only
router.delete("/:id", protect, recruiterOnly, deleteJob);

module.exports = router;