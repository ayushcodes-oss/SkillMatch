const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");

const {profileSchema} = require("../validation/schemas");

const {
    createProfile,
    getProfile,
    updateProfile,
    deleteProfile
} = require("../controllers/profileController");


// Create Profile
router.post(
    "/",
    protect,
    validate(profileSchema),
    createProfile
);


// Get Profile
router.get(
    "/",
    protect,
    getProfile
);


// Update Profile
router.put(
    "/",
    protect,
    validate(profileSchema),
    updateProfile
);


// Delete Profile
router.delete(
    "/",
    protect,
    deleteProfile
);


module.exports = router;