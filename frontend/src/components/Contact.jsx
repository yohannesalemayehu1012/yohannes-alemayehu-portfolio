import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPaperPlane,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";
import { toast } from "react-hot-toast";

import { sendMessage } from "../services/messageService";
import { useSettings } from "../context/settings-context";

const Contact = () => {
  const { settings } = useSettings();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // VALIDATE FORM
  // =====================================================

  const validateForm = () => {
    const validationErrors = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!name) validationErrors.name = "Name is required.";
    else if (name.length < 2)
      validationErrors.name = "Name must be at least 2 characters.";
    else if (name.length > 100)
      validationErrors.name = "Name must not exceed 100 characters.";

    if (!email) validationErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (subject.length > 250)
      validationErrors.subject = "Subject must not exceed 250 characters.";

    if (!message) validationErrors.message = "Message is required.";
    else if (message.length < 10)
      validationErrors.message = "Message must be at least 10 characters.";
    else if (message.length > 5000)
      validationErrors.message = "Message must not exceed 5000 characters.";

    return validationErrors;
  };

  // =====================================================
  // SUBMIT CONTACT FORM
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      setSending(true);

      const result = await sendMessage(formData);

      if (result.success) {
        toast.success("Message sent successfully! I'll get back to you soon.");

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setErrors({});
      } else {
        toast.error(result.message || "Failed to send your message.");
      }
    } catch (error) {
      console.error("Failed to send message:", error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        {/* =====================================================
                    SECTION HEADER
                ===================================================== */}

        <motion.div
          className="contact-header"
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
            duration: 0.6,
          }}
        >
          <span className="section-label">GET IN TOUCH</span>

          <h2 className="section-title">Let's Work Together</h2>

          <p className="section-subtitle">
            Have a project idea, opportunity, or question? Feel free to reach
            out. I would be happy to connect with you.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* =================================================
                        CONTACT INFORMATION
                    ================================================= */}

          <motion.div
            className="contact-info"
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
            {/* EMAIL */}

            {settings?.email && (
              <div className="contact-info-item">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>

                <div>
                  <span>Email</span>

                  <a href={`mailto:${settings.email}`}>{settings.email}</a>
                </div>
              </div>
            )}

            {/* PHONE */}

            {settings?.phone && (
              <div className="contact-info-item">
                <div className="contact-icon">
                  <FaPhone />
                </div>

                <div>
                  <span>Phone</span>

                  <a href={`tel:${settings.phone}`}>{settings.phone}</a>
                </div>
              </div>
            )}

            {/* LOCATION */}

            {settings?.location && (
              <div className="contact-info-item">
                <div className="contact-icon">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <span>Location</span>

                  <p>{settings.location}</p>
                </div>
              </div>
            )}

            {/* AVAILABILITY */}

            {settings?.availability && (
              <div className="contact-info-item">
                <div className="contact-icon">
                  <span>✓</span>
                </div>

                <div>
                  <span>Availability</span>

                  <p>{settings.availability}</p>
                </div>
              </div>
            )}

            {/* SOCIAL LINKS */}

            <div className="contact-socials">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </motion.div>

          {/* =================================================
                        CONTACT FORM
                    ================================================= */}

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{
              opacity: 0,
              x: 40,
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
            {/* NAME + EMAIL */}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  minLength={2}
                  maxLength={100}
                  required
                />
                {errors.name && (
                  <small className="form-error">{errors.name}</small>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  maxLength={255}
                  required
                />
                {errors.email && (
                  <small className="form-error">{errors.email}</small>
                )}
              </div>
            </div>

            {/* SUBJECT */}

            <div className="form-group">
              <label htmlFor="subject">Subject</label>

              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What would you like to discuss?"
                maxLength={250}
              />
              {errors.subject && (
                <small className="form-error">{errors.subject}</small>
              )}
            </div>

            {/* MESSAGE */}

            <div className="form-group">
              <label htmlFor="message">Message</label>

              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows="7"
                minLength={10}
                maxLength={5000}
                required
              />
              {errors.message && (
                <small className="form-error">{errors.message}</small>
              )}
            </div>

            {/* SUBMIT BUTTON */}

            <button type="submit" className="contact-submit" disabled={sending}>
              {sending ? (
                "Sending..."
              ) : (
                <>
                  Send Message
                  <FaPaperPlane />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
