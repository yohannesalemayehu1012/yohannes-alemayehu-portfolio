import { FiDownload, FiExternalLink } from "react-icons/fi";
import { useSettings } from "../context/settings-context";
import SEO from "../components/SEO";
import "./Resume.css";

const Resume = () => {
  const { settings, loading } = useSettings();

  if (loading) {
    return (
      <div className="resume-page">
        <SEO
          title="Resume"
          description="View the resume of Yohannes Alemayehu, including education, experience, skills, projects, and professional background."
          path="/resume"
        />
        <div className="container">
          <p>Loading resume...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="resume-page">
      <SEO
        title="Resume"
        description="View the resume of Yohannes Alemayehu, including education, experience, skills, projects, and professional background."
        path="/resume"
      />
      <div className="container">
        <div className="resume-header">
          <span className="resume-label">MY RESUME</span>

          <h1>Resume</h1>

          <p>
            View my professional resume and learn more about my experience,
            education, skills, and projects.
          </p>
        </div>

        {settings.resume_url ? (
          <div className="resume-actions">
            <a
              href={settings.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="resume-btn primary"
            >
              <FiExternalLink />
              View Resume
            </a>

            <a
              href={settings.resume_url}
              download
              className="resume-btn secondary"
            >
              <FiDownload />
              Download Resume
            </a>
          </div>
        ) : (
          <div className="resume-empty">
            <h2>Resume Coming Soon</h2>

            <p>My resume will be available here soon.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Resume;
