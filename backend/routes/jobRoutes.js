const express = require("express");
const router = express.Router();

const {
    protect,
    recruiterOnly
} = require("../middleware/authMiddleware");

const validate = require("../middleware/validateMiddleware");

const {
    jobSchema,
    jobIdSchema
} = require("../validation/schemas");

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
    validate(jobSchema),
    createJob
);


// Get All Jobs
router.get(
    "/",
    protect,
    getJobs
);


// Get Single Job
router.get(
    "/:id",
    protect,
    validate(jobIdSchema, "params"),
    getJob
);


// Update Job
router.put(
    "/:id",
    protect,
    recruiterOnly,
    validate(jobIdSchema, "params"),
    validate(jobSchema),
    updateJob
);


// Delete Job
router.delete(
    "/:id",
    protect,
    recruiterOnly,
    validate(jobIdSchema, "params"),
    deleteJob
);


module.exports = router;