const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {createProfile, getProfile,updateProfile,deleteProfile } = require("../controllers/profileController");
console.log("protect:", protect);
console.log("getProfile:", getProfile);

router.post("/", protect, createProfile);
router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);
router.delete("/", protect, deleteProfile);
module.exports = router;