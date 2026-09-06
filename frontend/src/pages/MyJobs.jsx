import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await api.get("/jobs/recruiter/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("My Jobs:", response.data);

      setJobs(response.data.jobs || []);
    } catch (err) {
      console.log("My Jobs Error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load your jobs"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const deleteJob = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(
        jobs.filter((job) => job._id !== jobId)
      );

    } catch (err) {
      console.log("Delete Job Error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to delete job"
      );
    }
  };

  if (loading) {
    return (
      <div className="my-jobs-page">
        <div className="my-jobs-empty">
          <h2>Loading jobs...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="my-jobs-page">

      <div className="my-jobs-header">

        <div>
          <p>RECRUITER</p>

          <h1>My Posted Jobs</h1>

          <span>
            Manage the jobs and opportunities you have posted.
          </span>
        </div>

        <Link
          to="/post-job"
          className="post-new-job-button"
        >
          + Post New Job
        </Link>

      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!error && jobs.length === 0 && (
        <div className="my-jobs-empty">

          <div className="empty-icon">
            💼
          </div>

          <h2>No Jobs Posted</h2>

          <p>
            You haven't posted any jobs yet.
          </p>

          <Link
            to="/post-job"
            className="browse-jobs-button"
          >
            Post Your First Job
          </Link>

        </div>
      )}

      {!error && jobs.length > 0 && (
        <div className="my-jobs-list">

          {jobs.map((job) => (

            <div
              className="my-job-card"
              key={job._id}
            >

              <div className="my-job-info">

                <div className="my-job-icon">
                  💼
                </div>

                <div>
                  <h2>{job.title}</h2>

                  <h3>{job.company}</h3>

                  <p>
                    📍 {job.location}
                  </p>

                  <div className="my-job-skills">
                    {job.skills?.map(
                      (skill, index) => (
                        <span key={index}>
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>

              </div>

              <div className="my-job-actions">

                <span className="job-type">
                  {job.jobType}
                </span>

                <Link
                  to={`/jobs/${job._id}`}
                  className="view-job-button"
                >
                  View
                </Link>

                <button
                  className="delete-job-button"
                  onClick={() =>
                    deleteJob(job._id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default MyJobs;