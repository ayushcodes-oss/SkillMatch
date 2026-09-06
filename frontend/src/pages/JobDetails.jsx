import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [applying, setApplying] = useState(false);

  // Get Job Details
  useEffect(() => {
    const getJob = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const response = await api.get(`/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Job Response:", response.data);

        // Works with both:
        // { job: {...} }
        // and
        // { ...job }
        setJob(response.data.job || response.data);

      } catch (err) {
        console.log("Get Job Error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load job"
        );
      } finally {
        setLoading(false);
      }
    };

    getJob();
  }, [id]);

  // Apply for Job
  const applyJob = async () => {
    try {
      setApplying(true);
      setMessage("");
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first");
        return;
      }

      const response = await api.post(
        "/applications",
        {
          job: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Application Response:", response.data);

      setMessage("Application submitted successfully!");

    } catch (err) {
      console.log("Apply Error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to apply for this job"
      );

    } finally {
      setApplying(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="job-details-page">
        <div className="job-details-card">
          <h2>Loading job details...</h2>
        </div>
      </div>
    );
  }

  // Job Not Found
  if (!job) {
    return (
      <div className="job-details-page">
        <div className="job-details-card">
          <h2>{error || "Job not found"}</h2>

          <Link
            to="/jobs"
            className="back-link"
          >
            ← Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="job-details-page">
      <div className="job-details-card">

        {/* Back Button */}
        <Link
          to="/jobs"
          className="back-link"
        >
          ← Back to Jobs
        </Link>

        {/* Header */}
        <div className="job-details-header">

          <div>
            <p className="job-details-label">
              JOB OPPORTUNITY
            </p>

            <h1>{job.title}</h1>

            <h2>{job.company}</h2>
          </div>

          <span className="job-type">
            {job.jobType}
          </span>

        </div>

        {/* Job Meta */}
        <div className="job-meta">

          <span>
            📍 {job.location}
          </span>

          <span>
            💰 {job.salary || "Salary not specified"}
          </span>

        </div>

        {/* Description */}
        <div className="job-details-section">

          <h3>Job Description</h3>

          <p>
            {job.description}
          </p>

        </div>

        {/* Skills */}
        <div className="job-details-section">

          <h3>Required Skills</h3>

          <div className="details-skills">

            {job.skills &&
              job.skills.map((skill, index) => (
                <span key={index}>
                  {skill}
                </span>
              ))}

          </div>

        </div>

        {/* Success Message */}
        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Apply Button */}
        <button
          className="apply-button"
          onClick={applyJob}
          disabled={applying || !!message}
        >
          {applying
            ? "Applying..."
            : message
            ? "Applied ✓"
            : "Apply Now"}
        </button>

      </div>
    </div>
  );
}

export default JobDetails;