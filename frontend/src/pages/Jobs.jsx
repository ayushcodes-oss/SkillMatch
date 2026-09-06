import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [skill, setSkill] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const params = {};

      if (search.trim()) {
        params.search = search.trim();
      }

      if (skill.trim()) {
        params.skill = skill.trim();
      }

      if (location.trim()) {
        params.location = location.trim();
      }

      if (jobType) {
        params.jobType = jobType;
      }

      const response = await api.get("/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });

      setJobs(response.data.jobs);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to load jobs"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleClear = () => {
    setSearch("");
    setSkill("");
    setLocation("");
    setJobType("");

    setTimeout(() => {
      fetchJobs();
    }, 0);
  };

  return (
    <div className="jobs-page">

      {/* HEADER */}

      <div className="jobs-header">
        <p>OPPORTUNITIES</p>

        <h1>Find Your Next Opportunity</h1>

        <span>
          Explore jobs and internships that match your skills.
        </span>
      </div>

      {/* FILTERS */}

      <form
        className="job-filters"
        onSubmit={handleSearch}
      >

        <input
          type="text"
          placeholder="Search jobs or companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="text"
          placeholder="Skill e.g. React"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        >
          <option value="">All Job Types</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
        </select>

        <button type="submit">
          Search
        </button>

        <button
          type="button"
          className="clear-button"
          onClick={handleClear}
        >
          Clear
        </button>

      </form>

      {/* ERROR */}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* LOADING */}

      {loading && (
        <div className="no-jobs">
          <h2>Loading jobs...</h2>
        </div>
      )}

      {/* NO JOBS */}

      {!loading && !error && jobs.length === 0 && (
        <div className="no-jobs">
          <h2>No jobs found</h2>
          <p>
            Try changing your search or filters.
          </p>
        </div>
      )}

      {/* JOBS */}

      {!loading && jobs.length > 0 && (
        <>

          <div className="jobs-count">
            Showing <strong>{jobs.length}</strong> jobs
          </div>

          <div className="jobs-grid">

            {jobs.map((job) => (
              <div
                className="job-card"
                key={job._id}
              >

                {/* TOP */}

                <div className="job-card-top">

                  <div className="company-icon">
                    💼
                  </div>

                  <span className="job-type">
                    {job.jobType}
                  </span>

                </div>

                {/* TITLE */}

                <h2>
                  {job.title}
                </h2>

                {/* COMPANY */}

                <h3>
                  {job.company}
                </h3>

                {/* LOCATION */}

                <p className="job-location">
                  📍 {job.location}
                </p>

                {/* DESCRIPTION */}

                <p className="job-description">
                  {job.description}
                </p>

                {/* SKILLS */}

                <div className="skills">

                  {job.skills?.map((skill, index) => (
                    <span key={index}>
                      {skill}
                    </span>
                  ))}

                </div>

                {/* BOTTOM */}

                <div className="job-bottom">

                  <span>
                    {job.salary || "Salary not specified"}
                  </span>

                  <Link
                    to={`/jobs/${job._id}`}
                    className="view-job"
                  >
                    View Job →
                  </Link>

                </div>

              </div>
            ))}

          </div>

        </>
      )}

    </div>
  );
}

export default Jobs;