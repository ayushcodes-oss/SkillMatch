const express = require('express');
const router = express.Router();

const{protect,recruiterOnly} = require("../middleware/authMiddleware");

const{recruiterDashboard} = require("../controllers/recruiterController");

router.get("/dashboard",protect,recruiterOnly,recruiterDashboard);

module.exports = router;