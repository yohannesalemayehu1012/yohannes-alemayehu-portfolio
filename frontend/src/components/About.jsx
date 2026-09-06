import { motion } from "framer-motion";
import { FaCode, FaServer, FaDatabase, FaBrain } from "react-icons/fa";

import { useSettings } from "../context/settings-context";

const About = () => {
  const { settings } = useSettings();

  const highlights = [
    {
      icon: <FaCode />,
      title: "Frontend Development",
      description:
        "Building responsive and modern user interfaces with React and JavaScript.",
    },
    {
      icon: <FaServer />,
      title: "Backend Development",
      description:
        "Creating REST APIs and server-side applications with Node.js and Express.",
    },
    {
      icon: <FaDatabase />,
      title: "Database Development",
      description:
        "Designing and working with relational databases such as PostgreSQL.",
    },
    {
      icon: <FaBrain />,
      title: "AI & Machine Learning",
      description:
        "Exploring machine learning and intelligent solutions using Python.",
    },
  ];

  return (
    <section id="about" className="section about-section">
      <div className="container">
        {/* ==============================
                    SECTION HEADING
                ============================== */}

        <div className="section-heading">
          <span className="section-label">ABOUT ME</span>

          <h2 className="section-title">
            Turning ideas into
            <span> digital solutions.</span>
          </h2>

          <p className="section-subtitle">
            A little about who I am, what I build, and what drives me as a
            software engineering student.
          </p>
        </div>

        <div className="about-grid">
          {/* ==============================
                        ABOUT CONTENT
                    ============================== */}

          <motion.div
            className="about-content"
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            {/* Dynamic About Description */}

            <p>{settings?.about_description}</p>

            {/* ==============================
                            ABOUT STATS
                        ============================== */}

            <div className="about-stats">
              <div>
                <strong>Full-Stack</strong>

                <span>Development</span>
              </div>

              <div>
                <strong>React</strong>

                <span>Frontend</span>
              </div>

              <div>
                <strong>Node.js</strong>

                <span>Backend</span>
              </div>
            </div>
          </motion.div>

          {/* ==============================
                        ABOUT HIGHLIGHTS
                    ============================== */}

          <div className="about-highlights">
            {highlights.map((item, index) => (
              <motion.div
                className="highlight-card"
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >
                <div className="highlight-icon">{item.icon}</div>

                <div>
                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
