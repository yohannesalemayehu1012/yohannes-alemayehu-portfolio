import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  FaGithub,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaEnvelope,
  FaArrowUp,
} from "react-icons/fa";

import { getSocialLinks } from "../services/socialService";
import { useSettings } from "../context/settings-context";
import BrandMark from "./BrandMark";

const Footer = () => {
  const [socialLinks, setSocialLinks] = useState([]);

  const { settings } = useSettings();

  // =====================================================
  // FETCH SOCIAL LINKS
  // =====================================================

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const result = await getSocialLinks();

        if (result.success) {
          setSocialLinks(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch social links:", error);
      }
    };

    fetchSocialLinks();
  }, []);

  // =====================================================
  // GET SOCIAL ICON
  // =====================================================

  const getIcon = (platform) => {
    const name = platform.toLowerCase();

    if (name.includes("github")) {
      return <FaGithub />;
    }

    if (name.includes("linkedin")) {
      return <FaLinkedinIn />;
    }

    if (name.includes("facebook")) {
      return <FaFacebookF />;
    }

    if (name.includes("instagram")) {
      return <FaInstagram />;
    }

    if (name.includes("youtube")) {
      return <FaYoutube />;
    }

    if (name.includes("email")) {
      return <FaEnvelope />;
    }

    return null;
  };

  // =====================================================
  // SCROLL TO TOP
  // =====================================================

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // CURRENT YEAR
  // =====================================================

  const currentYear = new Date().getFullYear();

  // =====================================================
  // FOOTER TEXT
  // =====================================================

  const footerText = settings?.footer_text
    ? settings.footer_text.replace("{year}", currentYear)
    : `© ${currentYear} All rights reserved.`;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          {/* =================================================
                        BRAND
                    ================================================= */}

          <motion.div
            className="footer-brand"
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
          >
            <a
              href="#home"
              className="footer-logo"
              aria-label={settings?.site_name || "Home"}
            >
              <BrandMark />
            </a>

            <p>
              {settings?.hero_description ||
                "Software engineering student and full-stack developer building digital solutions for real-world problems."}
            </p>
          </motion.div>

          {/* =================================================
                        QUICK LINKS
                    ================================================= */}

          <div className="footer-links">
            <h3>Quick Links</h3>

            <a href="#home">Home</a>

            <a href="#about">About</a>

            <a href="#skills">Skills</a>

            <a href="#projects">Projects</a>

            <a href="#experience">Experience</a>

            <a href="#education">Education</a>

            <a href="#contact">Contact</a>
          </div>

          {/* =================================================
                        SOCIAL LINKS
                    ================================================= */}

          <div className="footer-social">
            <h3>Connect With Me</h3>

            <div className="footer-social-icons">
              {socialLinks.map((social) => {
                const icon = getIcon(social.platform);

                if (!icon) {
                  return null;
                }

                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    title={social.platform}
                  >
                    {icon}
                  </a>
                );
              })}
            </div>
          </div>

          {/* =================================================
                        BACK TO TOP
                    ================================================= */}

          <button
            className="back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
          >
            <FaArrowUp />
          </button>
        </div>

        {/* =====================================================
                    FOOTER BOTTOM
                ===================================================== */}

        <div className="footer-bottom">
          <p>{footerText}</p>

          <p>Built with React, Node.js & PostgreSQL.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
