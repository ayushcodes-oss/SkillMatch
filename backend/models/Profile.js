const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  bio: {
    type: String,
    default: ""
  },

  skills: {
    type: [String],
    default: []
  },

  education: {
    type: String,
    default: ""
  },

  experience: {
    type: String,
    default: ""
  },

  github: {
    type: String,
    default: ""
  },

  linkedin: {
    type: String,
    default: ""
  },

  resume: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("Profile", profileSchema);