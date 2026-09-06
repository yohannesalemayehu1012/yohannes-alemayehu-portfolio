import { useSettings } from "../context/settings-context";
import SEO from "./SEO";

function Home() {
  const { settings } = useSettings();

  return (
    <section className="hero">
      <SEO
        title="Yohannes Alemayehu"
        description="Yohannes Alemayehu, a Software Engineering student and full-stack developer building practical digital solutions."
        path="/"
      />
      <div className="container hero-container">
        <div className="hero-content">
          <p className="hero-label">{settings?.professional_title}</p>

          <h1>{settings?.hero_description}</h1>

          <p>{settings?.about_description}</p>

          <div className="hero-availability">
            <span>{settings?.availability}</span>
          </div>

          <div className="hero-buttons">
            {settings?.resume_url ? (
              <a
                href={settings.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                View Resume
              </a>
            ) : (
              <a href="/resume" className="btn btn-primary">
                View Resume
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
