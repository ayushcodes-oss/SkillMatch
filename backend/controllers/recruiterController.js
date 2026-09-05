const Job = require("../models/Job");
const Application = require("../models/Application");
//  RECRUITER DASHBOARD 
const recruiterDashboard = async (req, res) => {
  try {
    // Total jobs created by recruiter
    const totalJobs = await Job.countDocuments({
      recruiter: req.user.id
    });
    // Find recruiter's jobs
    const recruiterJobs = await Job.find({
      recruiter: req.user.id
    }).select("_id");
    // Get job IDs
    const jobIds = recruiterJobs.map(job => job._id);
    // Total applications
    const totalApplications = await Application.countDocuments({
      job: { $in: jobIds }
    });
    // Shortlisted applications
    const shortlisted = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Shortlisted"
    });
    // Rejected applications
    const rejected = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Rejected"
    });
    // Selected applications
    const selected = await Application.countDocuments({
      job: { $in: jobIds },
      status: "Selected"
    });
    // Response
    res.status(200).json({
      totalJobs,
      totalApplications,
      shortlisted,
      rejected,
      selected
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};
// GET RECRUITER JOBS
const getRecruiterJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      recruiter: req.user.id
    });
    res.status(200).json({
      count: jobs.length,
      jobs
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

module.exports = {
  recruiterDashboard,
  getRecruiterJobs
};