import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import { useSettings } from "../context/settings-context";
import BrandMark from "./BrandMark";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { settings } = useSettings();

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* ==============================
                    LOGO
                ============================== */}

        <a
          href="#home"
          className="logo"
          aria-label={settings?.site_name || "Home"}
        >
          <BrandMark />
        </a>

        {/* ==============================
                    SITE NAME
                ============================== */}

        {settings?.site_name && (
          <span className="navbar-site-name">{settings.site_name}</span>
        )}

        {/* ==============================
                    NAVIGATION
                ============================== */}

        <nav className={menuOpen ? "nav-menu active" : "nav-menu"}>
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}

          {settings?.resume_url ? (
            <a
              href={settings.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              Resume
            </a>
          ) : (
            <a href="/resume" onClick={() => setMenuOpen(false)}>
              Resume
            </a>
          )}

          <a href="/admin/login" onClick={() => setMenuOpen(false)}>
            Admin
          </a>
        </nav>

        {/* ==============================
                    MOBILE MENU BUTTON
                ============================== */}

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
