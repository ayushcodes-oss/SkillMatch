import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        SkillMatch
      </Link>

      <div className="nav-links">

        {!isLoggedIn ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>

            <Link to="/jobs">Jobs</Link>

            <Link to="/profile">Profile</Link>

            {user?.role === "student" && (
              <Link to="/applications">
                My Applications
              </Link>
            )}

            {user?.role === "recruiter" && (
              <>
                <Link to="/my-jobs">My Jobs</Link>
                <Link to="/post-job">Post Job</Link>
                <Link to="/applicants">Applicants</Link>
              </>
            )}

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;