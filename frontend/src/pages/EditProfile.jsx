import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function EditProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bio: "",
    skills: "",
    education: "",
    experience: "",
    github: "",
    linkedin: "",
    resume: "",
  });

  const [profileExists, setProfileExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

      const profile = response.data;

      setProfileExists(true);

      setFormData({
        bio: profile.bio || "",
        skills: profile.skills?.join(", ") || "",
        education: profile.education || "",
        experience: profile.experience || "",
        github: profile.github || "",
        linkedin: profile.linkedin || "",
        resume: profile.resume || "",
      });

    } catch (err) {

      if (err.response?.status === 404) {
        setProfileExists(false);
      } else {
        setError(
          err.response?.data?.message || "Failed to load profile"
        );
      }

    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const token = localStorage.getItem("token");

      const data = {
        bio: formData.bio,
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== ""),
        education: formData.education,
        experience: formData.experience,
        github: formData.github,
        linkedin: formData.linkedin,
        resume: formData.resume,
      };

      if (profileExists) {
        await api.put("/profile", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await api.post("/profile", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfileExists(true);
      }

      setSuccess("Profile saved successfully!");

      setTimeout(() => {
        navigate("/profile");
      }, 1000);

    } catch (err) {

      setError(
        err.response?.data?.message || "Failed to save profile"
      );

    } finally {
      setSaving(false);
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
    <div className="edit-profile-page">

      <div className="edit-profile-header">
        <div>
          <p className="dashboard-label">PROFILE</p>
          <h1>
            {profileExists ? "Edit Profile" : "Create Profile"}
          </h1>
          <p>
            Keep your professional information updated.
          </p>
        </div>
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

      <form
        className="profile-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">
          <label>Bio</label>

          <textarea
            name="bio"
            rows="5"
            placeholder="Tell recruiters about yourself..."
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Skills</label>

          <input
            type="text"
            name="skills"
            placeholder="Java, React, Node.js, MongoDB"
            value={formData.skills}
            onChange={handleChange}
          />

          <small>
            Separate skills using commas.
          </small>
        </div>

        <div className="form-group">
          <label>Education</label>

          <textarea
            name="education"
            rows="3"
            placeholder="B.Tech in Computer Science..."
            value={formData.education}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Experience</label>

          <textarea
            name="experience"
            rows="4"
            placeholder="Internships, projects or work experience..."
            value={formData.experience}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>GitHub URL</label>

          <input
            type="url"
            name="github"
            placeholder="https://github.com/username"
            value={formData.github}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>LinkedIn URL</label>

          <input
            type="url"
            name="linkedin"
            placeholder="https://linkedin.com/in/username"
            value={formData.linkedin}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Resume URL</label>

          <input
            type="url"
            name="resume"
            placeholder="https://..."
            value={formData.resume}
            onChange={handleChange}
          />
        </div>

        <div className="profile-form-actions">

          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/profile")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-profile-button"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default EditProfile;