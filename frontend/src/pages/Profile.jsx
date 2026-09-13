import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(response.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setProfile(null);
      } else {
        setError(
          err.response?.data?.message || "Failed to load profile"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-loading">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">

      <div className="profile-header">
        <div>
          <p className="dashboard-label">MY PROFILE</p>
          <h1>Profile</h1>
          <p>Showcase your skills, experience and professional background.</p>
        </div>

        <Link to="/profile/edit" className="edit-profile-button">
          Edit Profile
        </Link>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!profile && !error && (
        <div className="empty-profile">
          <div className="empty-icon">👤</div>
          <h2>Create Your Profile</h2>
          <p>
            Add your skills, education, experience and professional links.
          </p>

          <Link to="/profile/edit" className="dashboard-button">
            Create Profile
          </Link>
        </div>
      )}

      {profile && (
        <div className="profile-content">

          <div className="profile-card">
            <h2>About Me</h2>
            <p className="profile-bio">
              {profile.bio || "No bio added yet."}
            </p>
          </div>

          <div className="profile-card">
            <h2>Skills</h2>

            {profile.skills?.length > 0 ? (
              <div className="profile-skills">
                {profile.skills.map((skill, index) => (
                  <span key={index}>{skill}</span>
                ))}
              </div>
            ) : (
              <p className="profile-muted">No skills added yet.</p>
            )}
          </div>

          <div className="profile-grid">

            <div className="profile-card">
              <h2>Education</h2>
              <p>
                {profile.education || "No education information added."}
              </p>
            </div>

            <div className="profile-card">
              <h2>Experience</h2>
              <p>
                {profile.experience || "No experience added."}
              </p>
            </div>

          </div>

          <div className="profile-card">
            <h2>Professional Links</h2>

            <div className="profile-links">

              {profile.github ? (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  💻 GitHub
                </a>
              ) : (
                <span>💻 GitHub not added</span>
              )}

              {profile.linkedin ? (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  🔗 LinkedIn
                </a>
              ) : (
                <span>🔗 LinkedIn not added</span>
              )}

              {profile.resume ? (
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer"
                >
                  📄 Resume
                </a>
              ) : (
                <span>📄 Resume not added</span>
              )}

            </div>
          </div>

        </div>
      )}

    </div>
  );
}

export default Profile;