import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";

function Applicants() {
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get("job");

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first");
        return;
      }

      const response = await api.get("/applications/recruiter", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let data = response.data.applications || [];

      // If a specific job is selected, show only its applicants
      if (jobId) {
        data = data.filter(
          (application) =>
            application.job?._id === jobId ||
            application.job === jobId
        );
      }

      setApplications(data);
    } catch (err) {
      console.log("Applicants Error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load applicants"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  const updateStatus = async (applicationId, status) => {
    try {
      setUpdatingId(applicationId);
      setError("");

      const token = localStorage.getItem("token");

      await api.put(
        `/applications/${applicationId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh applications after status update
      await fetchApplications();
    } catch (err) {
      console.log("Status Update Error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to update application status"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="page-loading">
        <p>Loading applicants...</p>
      </div>
    );
  }

  return (
    <div className="applicants-page">

      <div className="applicants-header">
        <div>
          <p className="dashboard-label">
            RECRUITER
          </p>

          <h1>Applicants</h1>

          <p>
            Review candidates who applied to your jobs.
          </p>
        </div>

        <div className="applicant-count">
          {applications.length} Applicant
          {applications.length !== 1 ? "s" : ""}
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!error && applications.length === 0 && (
        <div className="empty-applicants">
          <div className="empty-icon">📋</div>

          <h2>No Applicants Yet</h2>

          <p>
            No applications have been submitted
            to your jobs yet.
          </p>
        </div>
      )}

      {applications.length > 0 && (
        <div className="applicants-list">

          {applications.map((application) => {

            const applicant =
              application.student || application.user;

            const job = application.job;

            const currentStatus =
              application.status || "Applied";

            return (
              <div
                className="applicant-card"
                key={application._id}
              >

                <div className="applicant-main">

                  <div className="applicant-avatar">
                    {applicant?.name
                      ?.charAt(0)
                      ?.toUpperCase() || "U"}
                  </div>

                  <div className="applicant-info">

                    <h2>
                      {applicant?.name ||
                        "Unknown Applicant"}
                    </h2>

                    <p>
                      📧{" "}
                      {applicant?.email ||
                        "Email not available"}
                    </p>

                    <div className="applicant-job">

                      <strong>
                        Applied for:
                      </strong>{" "}

                      {job?.title ||
                        "Job not available"}

                      {job?.company && (
                        <span>
                          {" "}• {job.company}
                        </span>
                      )}

                    </div>

                  </div>

                </div>

                <div className="applicant-actions">

                  <span
                    className={`application-status ${currentStatus.toLowerCase()}`}
                  >
                    {currentStatus}
                  </span>

                  <div className="status-buttons">

                    <button
                      className="shortlist-btn"
                      disabled={
                        updatingId === application._id
                      }
                      onClick={() =>
                        updateStatus(
                          application._id,
                          "Shortlisted"
                        )
                      }
                    >
                      Shortlist
                    </button>

                    <button
                      className="reject-btn"
                      disabled={
                        updatingId === application._id
                      }
                      onClick={() =>
                        updateStatus(
                          application._id,
                          "Rejected"
                        )
                      }
                    >
                      Reject
                    </button>

                    <button
                      className="select-btn"
                      disabled={
                        updatingId === application._id
                      }
                      onClick={() =>
                        updateStatus(
                          application._id,
                          "Selected"
                        )
                      }
                    >
                      Select
                    </button>

                  </div>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default Applicants;