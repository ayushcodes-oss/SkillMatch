import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">SMARTER WAY TO FIND OPPORTUNITIES</p>

          <h1>
            Find the right
            <span> opportunity </span>
            for your skills.
          </h1>

          <p className="hero-text">
            SkillMatch connects students with jobs and internships
            based on their skills, interests and career goals.
          </p>

          <div className="hero-buttons">
            <Link to="/register" className="primary-btn">
              Get Started
            </Link>

            <Link to="/login" className="secondary-btn">
              Login
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="card-icon">💼</div>
          <h3>Skill-based matching</h3>
          <p>
            Discover opportunities that match what you know and what
            you want to learn.
          </p>

          <div className="mini-stats">
            <div>
              <strong>100+</strong>
              <span>Skills</span>
            </div>

            <div>
              <strong>50+</strong>
              <span>Jobs</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Access</span>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="section-heading">
          <p>WHY SKILLMATCH?</p>
          <h2>Everything you need to grow your career</h2>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Find Relevant Jobs</h3>
            <p>
              Search and filter jobs based on your skills,
              location and job type.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👤</div>
            <h3>Build Your Profile</h3>
            <p>
              Showcase your skills, education, experience,
              GitHub and LinkedIn profile.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Track Applications</h3>
            <p>
              Apply for opportunities and easily track your
              application status.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;