const Application = require("../models/Application");
const Job = require("../models/Job");



const applyForJob = async (req, res) => {
    try {
        const { job } = req.body;

        const jobExists = await Job.findById(job);

        if (!jobExists) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        const existingApplication =
            await Application.findOne({
                student: req.user.id,
                job: job
            });

        if (existingApplication) {
            return res.status(400).json({
                message:
                    "You have already applied for this job"
            });
        }

        const application =
            await Application.create({
                student: req.user.id,
                job: job
            });

        res.status(201).json({
            message:
                "Job application submitted successfully",
            application
        });

    } catch (error) {

        // MongoDB duplicate key protection
        if (error.code === 11000) {
            return res.status(400).json({
                message:
                    "You have already applied for this job"
            });
        }

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};



const getMyApplications = async (req, res) => {
    try {

        const applications = await Application.find({
            student: req.user.id
        })
            .populate("job")
            .sort({ appliedAt: -1 });

        res.status(200).json({
            count: applications.length,
            applications
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }
};


const getRecruiterApplications = async (req, res) => {
    try {

        const applications = await Application.find()
            .populate({
                path: "job",
                match: {
                    recruiter: req.user.id
                },
                select: "title company location jobType salary"
            })
            .populate("student", "name email")
            .sort({ appliedAt: -1 });


        // Only recruiter's applications
        const filteredApplications = applications.filter(
            (application) => application.job !== null
        );


        // Clean response
        const result = filteredApplications.map(
            (application) => ({
                applicationId: application._id,
                status: application.status,
                appliedAt: application.appliedAt,
                student: application.student,
                job: application.job
            })
        );


        res.status(200).json({
            count: result.length,
            applications: result
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }
};


const updateApplicationStatus = async (req, res) => {
    try {

        const { status } = req.body || {};


        // Check status
        if (!status) {
            return res.status(400).json({
                message: "Status is required"
            });
        }


        // Valid statuses
        const validStatuses = [
            "Applied",
            "Shortlisted",
            "Rejected",
            "Selected"
        ];


        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid application status"
            });
        }


        // Find application
        const application = await Application.findById(
            req.params.id
        ).populate("job");


        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }


        // Check job exists
        if (!application.job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }


        // Check recruiter ownership
        if (
            application.job.recruiter.toString() !==
            req.user.id
        ) {
            return res.status(403).json({
                message:
                    "You can only update applications for your jobs"
            });
        }


        // Update status
        application.status = status;

        await application.save();


        res.status(200).json({
            message:
                "Application status updated successfully",
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