import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login first");
          setLoading(false);
          return;
        }

        const response = await api.get("/applications/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Applications:", response.data);

        setApplications(response.data.applications || []);
      } catch (err) {
        console.log("Applications Error:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load applications"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="applications-page">
        <div className="applications-empty">
          <h2>Loading applications...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="applications-page">

      <div className="applications-header">
        <p>MY APPLICATIONS</p>

        <h1>Track Your Applications</h1>

        <span>
          Keep track of the jobs and internships you have applied for.
        </span>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!error && applications.length === 0 && (
        <div className="applications-empty">

          <div className="empty-icon">
            📋
          </div>

          <h2>No Applications Yet</h2>

          <p>
            You haven't applied to any jobs yet.
          </p>

          <Link
            to="/jobs"
            className="browse-jobs-button"
          >
            Browse Jobs
          </Link>

        </div>
      )}

      {!error && applications.length > 0 && (
        <div className="applications-list">

          {applications.map((application) => {

            const appliedDate =
              application.createdAt ||
              application.appliedAt;

            return (
              <div
                className="application-card"
                key={application._id}
              >

                <div className="application-info">

                  <div className="application-icon">
                    💼
                  </div>

                  <div>
                    <h2>
                      {application.job?.title || "Job"}
                    </h2>

                    <h3>
                      {application.job?.company || "Company"}
                    </h3>

                    <p>
                      📍{" "}
                      {application.job?.location ||
                        "Location not specified"}
                    </p>
                  </div>

                </div>

                <div className="application-right">

                  <span
                    className={`application-status ${
                      application.status?.toLowerCase()
                    }`}
                  >
                    {application.status || "Applied"}
                  </span>

                  <p>
                    Applied on{" "}
                    {appliedDate
                      ? new Date(
                          appliedDate
                        ).toLocaleDateString()
                      : "Date not available"}
                  </p>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default MyApplications;