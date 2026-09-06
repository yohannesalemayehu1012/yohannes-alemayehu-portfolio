import { useEffect, useState } from "react";
import {
  FaSave,
  FaUser,
  FaBriefcase,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFileAlt,
  FaGlobe,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

import useAuth from "../hooks/useAuth";

import { getSettings, saveSettings } from "../services/settingService";

import "./AdminSettings.css";

const AdminSettings = () => {
  const { token } = useAuth();

  const [settings, setSettings] = useState({
    site_name: "",
    professional_title: "",
    hero_description: "",
    about_description: "",
    email: "",
    phone: "",
    location: "",
    resume_url: "/resume.pdf",
    availability: "",
    footer_text: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadInitialSettings = async () => {
      try {
        const result = await getSettings();

        if (!cancelled) {
          setSettings((current) => ({
            ...current,
            ...(result.data || {}),
          }));
        }
      } catch (error) {
        console.error(error);

        if (!cancelled) {
          toast.error(
            error.response?.data?.message || "Failed to load settings",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadInitialSettings();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSettings((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const resumeValue = settings.resume_url.trim();

    if (settings.site_name.trim().length === 0) {
      toast.error("Name is required");
      return;
    }

    if (settings.professional_title.trim().length === 0) {
      toast.error("Professional title is required");
      return;
    }

    if (settings.hero_description.trim().length === 0) {
      toast.error("Hero description is required");
      return;
    }

    if (settings.about_description.trim().length === 0) {
      toast.error("About description is required");
      return;
    }

    if (settings.email.trim() && !emailRegex.test(settings.email.trim())) {
      toast.error("Enter a valid email");
      return;
    }

    if (resumeValue && !resumeValue.startsWith("/")) {
      try {
        const url = new URL(resumeValue);
        if (!["http:", "https:"].includes(url.protocol)) throw new Error();
      } catch {
        toast.error("Enter a valid resume URL");
        return;
      }
    }

    try {
      setSaving(true);

      await saveSettings(settings, token);

      toast.success("Settings saved successfully");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-settings-page">
        <div className="admin-settings-loading">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="admin-settings-page">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <span className="admin-page-eyebrow">PORTFOLIO CONFIGURATION</span>

          <h1>Site Settings</h1>

          <p>Manage your portfolio information from one central location.</p>
        </div>
      </div>

      <form className="settings-form" onSubmit={handleSubmit}>
        {/* Identity */}
        <section className="settings-section">
          <div className="settings-section-header">
            <div className="settings-section-icon">
              <FaUser />
            </div>

            <div>
              <h2>Personal Information</h2>

              <p>Basic information displayed throughout your portfolio.</p>
            </div>
          </div>

          <div className="settings-grid">
            <div className="settings-field">
              <label>Your Name</label>

              <input
                type="text"
                name="site_name"
                value={settings.site_name}
                onChange={handleChange}
                placeholder="Yohannes Alemayehu"
              />
            </div>

            <div className="settings-field">
              <label>Professional Title</label>

              <input
                type="text"
                name="professional_title"
                value={settings.professional_title}
                onChange={handleChange}
                placeholder="Software Engineer"
              />
            </div>
          </div>
        </section>

        {/* Hero */}
        <section className="settings-section">
          <div className="settings-section-header">
            <div className="settings-section-icon">
              <FaBriefcase />
            </div>

            <div>
              <h2>Hero Section</h2>

              <p>Content shown at the top of your portfolio.</p>
            </div>
          </div>

          <div className="settings-field">
            <label>Hero Description</label>

            <textarea
              name="hero_description"
              value={settings.hero_description}
              onChange={handleChange}
              rows="4"
              placeholder="Building digital solutions for real-world problems."
            />
          </div>
        </section>

        {/* About */}
        <section className="settings-section">
          <div className="settings-section-header">
            <div className="settings-section-icon">
              <FaUser />
            </div>

            <div>
              <h2>About Section</h2>

              <p>Your professional introduction.</p>
            </div>
          </div>

          <div className="settings-field">
            <label>About Description</label>

            <textarea
              name="about_description"
              value={settings.about_description}
              onChange={handleChange}
              rows="7"
              placeholder="Tell visitors about yourself..."
            />
          </div>
        </section>

        {/* Contact */}
        <section className="settings-section">
          <div className="settings-section-header">
            <div className="settings-section-icon">
              <FaEnvelope />
            </div>

            <div>
              <h2>Contact Information</h2>

              <p>Information visitors can use to contact you.</p>
            </div>
          </div>

          <div className="settings-grid">
            <div className="settings-field">
              <label>Email</label>

              <div className="settings-input-icon">
                <FaEnvelope />

                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="settings-field">
              <label>Phone</label>

              <div className="settings-input-icon">
                <FaPhone />

                <input
                  type="text"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  placeholder="+251..."
                />
              </div>
            </div>

            <div className="settings-field">
              <label>Location</label>

              <div className="settings-input-icon">
                <FaMapMarkerAlt />

                <input
                  type="text"
                  name="location"
                  value={settings.location}
                  onChange={handleChange}
                  placeholder="Ethiopia"
                />
              </div>
            </div>

            <div className="settings-field">
              <label>Availability</label>

              <div className="settings-input-icon">
                <FaGlobe />

                <input
                  type="text"
                  name="availability"
                  value={settings.availability}
                  onChange={handleChange}
                  placeholder="Available for opportunities"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Resume */}
        <section className="settings-section">
          <div className="settings-section-header">
            <div className="settings-section-icon">
              <FaFileAlt />
            </div>

            <div>
              <h2>Resume</h2>

              <p>Configure the resume link used by your portfolio.</p>
            </div>
          </div>

          <div className="settings-field">
            <label>Resume URL</label>

            <input
              type="text"
              name="resume_url"
              value={settings.resume_url}
              onChange={handleChange}
              placeholder="/resume.pdf or https://example.com/resume.pdf"
            />

            <small>
              Use <code>/resume.pdf</code> for the local file or paste an
              external PDF URL.
            </small>
          </div>
        </section>

        {/* Footer */}
        <section className="settings-section">
          <div className="settings-section-header">
            <div className="settings-section-icon">
              <FaGlobe />
            </div>

            <div>
              <h2>Footer</h2>

              <p>Customize your footer text.</p>
            </div>
          </div>

          <div className="settings-field">
            <label>Footer Text</label>

            <input
              type="text"
              name="footer_text"
              value={settings.footer_text}
              onChange={handleChange}
              placeholder="© 2026 Yohannes Alemayehu. All rights reserved."
            />
          </div>
        </section>

        {/* Save */}
        <div className="settings-save-container">
          <button
            type="submit"
            className="settings-save-button"
            disabled={saving}
          >
            <FaSave />

            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
