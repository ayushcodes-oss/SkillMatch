const Application = require("../models/Application");

// Apply for a Job
const applyForJob = async (req, res) => {
  try {
    const { job } = req.body;

    const existingApplication = await Application.findOne({
      student: req.user.id,
      job: job
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job"
      });
    }

    const application = await Application.create({
      student: req.user.id,
      job: job
    });

    res.status(201).json({
      message: "Job application submitted successfully",
      application
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

// Get My Applications
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      student: req.user.id
    }).populate("job");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

module.exports = {
  applyForJob,
  getMyApplications
};