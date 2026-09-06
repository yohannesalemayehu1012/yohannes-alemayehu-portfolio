import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown } from "react-icons/fa";

const Home = () => {
  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <div className="hero-layout">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="hero-label">
              SOFTWARE ENGINEERING STUDENT & FULL-STACK DEVELOPER
            </p>

            <h1>
              Building digital solutions
              <span> for real-world problems.</span>
            </h1>

            <p className="hero-description">
              I'm Yohannes Alemayehu, a Software Engineering student passionate
              about building modern web applications, solving problems, and
              continuously learning new technologies.
            </p>

            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">
                View My Work
              </a>

              <a href="#contact" className="btn btn-outline">
                Contact Me
              </a>
            </div>

            <div className="social-links">
              <a href="#" aria-label="GitHub">
                <FaGithub />
              </a>

              <a href="#" aria-label="LinkedIn">
                <FaLinkedin />
              </a>

              <a href="mailto:your-email@example.com">
                <FaEnvelope />
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero-image-wrapper"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <img
              src="/Yohannes.jpg"
              alt="Yohannes Alemayehu"
              width="600"
              height="600"
            />
          </motion.div>
        </div>

        <motion.div
          className="hero-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <FaArrowDown />
          <span>Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
