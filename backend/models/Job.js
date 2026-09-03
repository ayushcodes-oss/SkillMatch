const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: {
    type: String,
    required: true
  },

  company: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  skills: {
    type: [String],
    default: []
  },

  location: {
    type: String,
    required: true
  },

  salary: {
    type: String,
    default: ""
  },

  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Internship"],
    default: "Full-time"
  }
});

module.exports = mongoose.model("Job", jobSchema);