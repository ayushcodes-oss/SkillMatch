const express = require("express");
const router = express.Router();

const {
    protect,
    recruiterOnly
} = require("../middleware/authMiddleware");

const validate = require("../middleware/validateMiddleware");

const {
    applicationSchema,
    applicationStatusSchema,
    applicationIdSchema
} = require("../validation/schemas");

const applicationController = require("../controllers/applicationController");


// Apply for Job
router.post(
    "/",
    protect,
    validate(applicationSchema),
    applicationController.applyForJob
);


// My Applications
router.get(
    "/my",
    protect,
    applicationController.getMyApplications
);


// Recruiter's Applications
router.get(
    "/recruiter",
    protect,
    recruiterOnly,
    applicationController.getRecruiterApplications
);


// Update Application Status
router.put(
    "/:id/status",
    protect,
    recruiterOnly,
    validate(applicationIdSchema, "params"),
    validate(applicationStatusSchema),
    applicationController.updateApplicationStatus
);


module.exports = router;