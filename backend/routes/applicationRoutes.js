const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const applicationController = require("../controllers/applicationController");


router.post(
    "/",
    protect,
    applicationController.applyForJob
);


router.get(
    "/my",
    protect,
    applicationController.getMyApplications
);


router.get(
    "/recruiter",
    protect,
    applicationController.getRecruiterApplications
);


router.put(
    "/:id/status",
    protect,
    applicationController.updateApplicationStatus
);


module.exports = router;