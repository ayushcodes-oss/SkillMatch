import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      navigate("/login");
      return;
    }

    const loggedInUser = JSON.parse(storedUser);
    setUser(loggedInUser);

    // Fetch recruiter statistics
    if (loggedInUser.role === "recruiter") {
      fetchRecruiterStats(token);
    } else {
      setLoadingStats(false);
    }
  }, [navigate]);

  const fetchRecruiterStats = async (token) => {
    try {
      setLoadingStats(true);
      setError("");

      const response = await api.get("/recruiter/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Recruiter Stats:", response.data);

      setStats(response.data);
    } catch (err) {
      console.log("Recruiter Stats Error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load dashboard statistics"
      );
    } finally {
      setLoadingStats(false);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard">

      {/* ================= HEADER ================= */}

      <div className="dashboard-header">
        <div>
          <p className="dashboard-label">
            DASHBOARD
          </p>

          <h1>
            Welcome, {user.name}
          </h1>

          <p>
            You are logged in as a{" "}
            <strong>{user.role}</strong>.
          </p>
        </div>
      </div>


      {/* ================= STUDENT ================= */}

      {user.role === "student" && (
        <div className="dashboard-grid">

          <div className="dashboard-card">
            <div className="dashboard-icon">
              💼
            </div>

            <h3>Find Jobs</h3>

            <p>
              Discover jobs and internships that
              match your skills.
            </p>

            <Link
              to="/jobs"
              className="dashboard-button"
            >
              Browse Jobs
            </Link>
          </div>


          <div className="dashboard-card">
            <div className="dashboard-icon">
              👤
            </div>

            <h3>My Profile</h3>

            <p>
              Manage your skills, education and
              experience.
            </p>

           <Link to="/profile" className="dashboard-button"> View Profile</Link>
          </div>


          <div className="dashboard-card">
            <div className="dashboard-icon">
              📋
            </div>

            <h3>Applications</h3>

            <p>
              Track the status of your job
              applications.
            </p>

            <Link
              to="/applications"
              className="dashboard-button"
            >
              My Applications
            </Link>
          </div>

        </div>
      )}


      {/* ================= RECRUITER ================= */}

      {user.role === "recruiter" && (
        <>
          {/* Statistics */}

          <div className="stats-section">

            <div className="stats-header">
              <div>
                <p className="dashboard-label">
                  OVERVIEW
                </p>

                <h2>
                  Recruitment Statistics
                </h2>
              </div>
            </div>


            {error && (
              <div className="error-message">
                {error}
              </div>
            )}


            {loadingStats ? (
              <div className="stats-loading">
                Loading statistics...
              </div>
            ) : (
              <div className="stats-grid">

                <div className="stat-card">
                  <div className="stat-icon">
                    💼
                  </div>

                  <div>
                    <p>Total Jobs</p>
                    <h3>
                      {stats?.totalJobs || 0}
                    </h3>
                  </div>
                </div>


                <div className="stat-card">
                  <div className="stat-icon">
                    📋
                  </div>

                  <div>
                    <p>Total Applications</p>
                    <h3>
                      {stats?.totalApplications || 0}
                    </h3>
                  </div>
                </div>


                <div className="stat-card">
                  <div className="stat-icon">
                    ⭐
                  </div>

                  <div>
                    <p>Shortlisted</p>
                    <h3>
                      {stats?.shortlisted || 0}
                    </h3>
                  </div>
                </div>


                <div className="stat-card">
                  <div className="stat-icon">
                    ❌
                  </div>

                  <div>
                    <p>Rejected</p>
                    <h3>
                      {stats?.rejected || 0}
                    </h3>
                  </div>
                </div>


                <div className="stat-card">
                  <div className="stat-icon">
                    🎉
                  </div>

                  <div>
                    <p>Selected</p>
                    <h3>
                      {stats?.selected || 0}
                    </h3>
                  </div>
                </div>

              </div>
            )}

          </div>


          {/* Recruiter Actions */}

          <div className="dashboard-grid">

            <div className="dashboard-card">

              <div className="dashboard-icon">
                📊
              </div>

              <h3>
                Recruiter Dashboard
              </h3>

              <p>
                View your jobs and application
                statistics.
              </p>

              <Link
                to="/my-jobs"
                className="dashboard-button"
              >
                My Jobs
              </Link>

            </div>


            <div className="dashboard-card">

              <div className="dashboard-icon">
                ➕
              </div>

              <h3>
                Post a Job
              </h3>

              <p>
                Create a new job opportunity
                for students.
              </p>

              <Link
                to="/post-job"
                className="dashboard-button"
              >
                Post Job
              </Link>

            </div>


            <div className="dashboard-card">

              <div className="dashboard-icon">
                📋
              </div>

              <h3>
                Applications
              </h3>

              <p>
                Review applications submitted
                to your jobs.
              </p>

              <Link
                to="/applicants"
                className="dashboard-button"
              >
                View Applications
              </Link>

            </div>

          </div>
        </>
      )}

    </div>
  );
}

export default Dashboard;