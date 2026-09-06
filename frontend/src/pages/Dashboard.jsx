import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [navigate]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <p className="dashboard-label">DASHBOARD</p>

          <h1>
            Welcome, {user.name}
          </h1>

          <p>
            You are logged in as a{" "}
            <strong>{user.role}</strong>.
          </p>
        </div>
      </div>

      {user.role === "student" && (
        <div className="dashboard-grid">

          <div className="dashboard-card">
            <div className="dashboard-icon">💼</div>
            <h3>Find Jobs</h3>
            <p>
              Discover jobs and internships that match
              your skills.
            </p>
            <Link to="/jobs" className="dashboard-button"> Browse Jobs</Link>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-icon">👤</div>
            <h3>My Profile</h3>
            <p>
              Manage your skills, education and experience.
            </p>
            <button>
              View Profile
            </button>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-icon">📋</div>
            <h3>Applications</h3>
            <p>
              Track the status of your job applications.
            </p>
          <Link to="/applications"className="dashboard-button">My Applications</Link>
          </div>

        </div>
      )}

      {user.role === "recruiter" && (
        <div className="dashboard-grid">

          <div className="dashboard-card">
            <div className="dashboard-icon">📊</div>
            <h3>Recruiter Dashboard</h3>
            <p>
              View your jobs and application statistics.
            </p>
           <Link to="/my-jobs"className="dashboard-button">My Jobs</Link>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-icon">➕</div>
            <h3>Post a Job</h3>
            <p>
              Create a new job opportunity for students.
            </p>
            <Link to="/post-job" className="dashboard-button">Post Job</Link>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-icon">📋</div>
            <h3>Applications</h3>
            <p>
              Review applications submitted to your jobs.
            </p>
            <button>
              View Applications
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default Dashboard;