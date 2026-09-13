const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());


// Routes
const authRoute = require("./routes/authRoutes");
const profileRoute = require("./routes/profileRoutes");
const recruiterRoute = require("./routes/recruiterRoutes");
const jobRoute = require("./routes/jobRoutes");
const applicationRoute = require("./routes/applicationRoutes");


// API Routes
app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);
app.use("/api/recruiter", recruiterRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/applications", applicationRoute);



// Home
app.get("/", (req, res) => {
    res.status(200).json({
        message: "SkillMatch API is running"
    });
});


// Health Check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "SkillMatch API is healthy",
        timestamp: new Date().toISOString()
    });
});


// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});


// Error Handler
const errorHandler = require("./middleware/errorMiddleware");

app.use(errorHandler);


// Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});