const Job = require("../models/Job");


// ==================== CREATE JOB ====================

const createJob = async (req, res) => {
    try {

        const job = await Job.create({
            recruiter: req.user.id,
            ...req.body
        });

        res.status(201).json({
            message: "Job created successfully",
            job
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }
};


// ==================== GET ALL / SEARCH / FILTER JOBS ====================

const getJobs = async (req, res) => {
    try {

        const {
            search,
            skill,
            location,
            jobType,
            page = 1,
            limit = 10
        } = req.query;


        // Build filter
        const filter = {};


        // Search by title or company
        if (search) {
            filter.$or = [
                {
                    title: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    company: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }


        // Filter by skill
        if (skill) {
            filter.skills = {
                $regex: skill,
                $options: "i"
            };
        }


        // Filter by location
        if (location) {
            filter.location = {
                $regex: location,
                $options: "i"
            };
        }


        // Filter by job type
        if (jobType) {
            filter.jobType = jobType;
        }


        // Pagination
        const currentPage = Math.max(
            parseInt(page) || 1,
            1
        );

        const jobsPerPage = Math.min(
            Math.max(parseInt(limit) || 10, 1),
            50
        );

        const skip =
            (currentPage - 1) * jobsPerPage;


        // Get total jobs
        const totalJobs = await Job.countDocuments(filter);


        // Get jobs
        const jobs = await Job.find(filter)
            .populate("recruiter", "name email")
            .sort({ _id: -1 })
            .skip(skip)
            .limit(jobsPerPage);


        // Total pages
        const totalPages = Math.ceil(
            totalJobs / jobsPerPage
        );


        res.status(200).json({

            totalJobs,

            totalPages,

            currentPage,

            jobsPerPage,

            jobs

        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }
};

// ==================== GET RECRUITER'S JOBS ====================

const getRecruiterJobs = async (req, res) => {
    try {

        const jobs = await Job.find({
            recruiter: req.user.id
        })
        .populate("recruiter", "name email")
        .sort({ _id: -1 });


        res.status(200).json({
            jobs
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }
};


// ==================== GET SINGLE JOB ====================

const getJob = async (req, res) => {
    try {

        const job = await Job.findById(
            req.params.id
        ).populate(
            "recruiter",
            "name email"
        );


        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }


        res.status(200).json(job);

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }
};


// ==================== UPDATE JOB ====================

const updateJob = async (req, res) => {
    try {

        const job = await Job.findOneAndUpdate(
            {
                _id: req.params.id,
                recruiter: req.user.id
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );


        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }


        res.status(200).json({
            message: "Job updated successfully",
            job
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }
};


// ==================== DELETE JOB ====================

const deleteJob = async (req, res) => {
    try {

        const job = await Job.findOneAndDelete({
            _id: req.params.id,
            recruiter: req.user.id
        });


        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }


        res.status(200).json({
            message: "Job deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });

    }
};


module.exports = {
    createJob,
    getJobs,
    getRecruiterJobs,
    getJob,
    updateJob,
    deleteJob
};;