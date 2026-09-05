const express = require("express");

const router = express.Router();

const {
    protect,
    recruiterOnly
} = require("../middleware/authMiddleware");

const {
    createJob,
    getJobs,
    getJob,
    updateJob,
    deleteJob
} = require("../controllers/jobController");


// Create Job
router.post(
    "/",
    protect,
    recruiterOnly,
    createJob
);


// Search / Filter / Pagination
router.get(
    "/",
    protect,
    getJobs
);


// Get Single Job
router.get(
    "/:id",
    protect,
    getJob
);


// Update Job
router.put(
    "/:id",
    protect,
    recruiterOnly,
    updateJob
);


// Delete Job
router.delete(
    "/:id",
    protect,
    recruiterOnly,
    deleteJob
);


module.exports = router;