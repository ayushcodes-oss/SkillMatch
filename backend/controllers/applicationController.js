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
// Get Applications for Recruiter's Jobs
const getRecruiterApplications = async (req,res) =>{
  try{
    const applications = await Application.find().populate({
      path :"job",
      match :{recruiter:req.user.id}
    })
    .populate("student","name email")
    const filteredApplications  = applications.filter((application) => applications.job !== null);
    res.status(200).json(filteredApplications);
  } catch(error){
    res.status(500).json({
      message:"Server Error",
      error : error.message
    });
  }
};

// Update Application Status
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.id)
      .populate("job");

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }

    // Check if this job belongs to logged-in recruiter
    if (application.job.recruiter.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You can only update applications for your jobs"
      });
    }

    application.status = status;

    await application.save();

    res.status(200).json({
      message: "Application status updated successfully",
      application
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};


module.exports = {
  applyForJob,
  getMyApplications,
  getRecruiterApplications,
  updateApplicationStatus
};