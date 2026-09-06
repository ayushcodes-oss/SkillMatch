import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function PostJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    skills: "",
    location: "",
    salary: "",
    jobType: "Full-time",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first");
        return;
      }

      const jobData = {
        title: formData.title,
        company: formData.company,
        description: formData.description,

        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),

        location: formData.location,
        salary: formData.salary,
        jobType: formData.jobType,
      };

      const response = await api.post(
        "/jobs",
        jobData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Job Created:", response.data);

      setSuccess("Job posted successfully!");

      setFormData({
        title: "",
        company: "",
        description: "",
        skills: "",
        location: "",
        salary: "",
        jobType: "Full-time",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (err) {
      console.log("Post Job Error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to post job"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-job-page">

      <div className="post-job-card">

        <div className="post-job-header">
          <p>RECRUITER</p>

          <h1>Post a New Job</h1>

          <span>
            Create an opportunity and find the right candidate.
          </span>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-row">

            <div className="form-group">
              <label>Job Title</label>

              <input
                type="text"
                name="title"
                placeholder="e.g. React Developer"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Company</label>

              <input
                type="text"
                name="company"
                placeholder="e.g. Tech Solutions"
                value={formData.company}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              placeholder="Describe the job role and responsibilities..."
              value={formData.description}
              onChange={handleChange}
              rows="6"
              required
            />
          </div>

          <div className="form-group">
            <label>Skills</label>

            <input
              type="text"
              name="skills"
              placeholder="React, Node.js, MongoDB"
              value={formData.skills}
              onChange={handleChange}
              required
            />

            <small>
              Separate skills with commas
            </small>
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Location</label>

              <input
                type="text"
                name="location"
                placeholder="e.g. Delhi"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Salary</label>

              <input
                type="text"
                name="salary"
                placeholder="e.g. ₹6-8 LPA"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="form-group">
            <label>Job Type</label>

            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
            >
              <option value="Full-time">
                Full-time
              </option>

              <option value="Part-time">
                Part-time
              </option>

              <option value="Internship">
                Internship
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="post-job-button"
            disabled={loading}
          >
            {loading
              ? "Posting Job..."
              : "Post Job"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default PostJob;