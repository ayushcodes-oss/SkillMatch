const express = require('express');
const router = express.Router();

const{protect,recruiterOnly} = require("../middleware/authMiddleware");

const {
  recruiterDashboard,
  getRecruiterJobs
} = require("../controllers/recruiterController");


// Recruiter Dashboard Statistics

router.get(
  "/dashboard",
  protect,
  recruiterOnly,
  recruiterDashboard
);

router.get(
  "/jobs",
  protect,
  recruiterOnly,
  getRecruiterJobs
);

module.exports = router;