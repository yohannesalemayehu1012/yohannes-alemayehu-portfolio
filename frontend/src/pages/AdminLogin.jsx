import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock, FaEnvelope, FaSignInAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";

import { loginAdmin } from "../services/authService";
import useAuth from "../hooks/useAuth";
import SEO from "../components/SEO";

const AdminLogin = () => {
  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // If already authenticated, go directly to admin dashboard
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Handle login
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate email
    if (!formData.email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      toast.error("Enter a valid email.");
      return;
    }

    // Validate password
    // No minimum-length restriction.
    // Therefore passwords such as "1012" are allowed.
    if (!formData.password) {
      toast.error("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const result = await loginAdmin({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (result.success) {
        // Store authenticated user and JWT token
        login(result.user, result.token);

        toast.success("Login successful!");

        // Go to admin dashboard
        navigate("/admin");
      } else {
        toast.error(result.message || "Login failed.");
      }
    } catch (error) {
      console.error("Admin login failed:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to connect to the login server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <SEO
        title="Admin Login"
        description="Portfolio administration login."
        path="/admin/login"
        noindex
      />

      <motion.div
        className="admin-login-card"
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
      >
        {/* Header */}
        <div className="admin-login-header">
          <div className="admin-login-icon">
            <FaLock />
          </div>

          <span className="section-label">ADMIN AREA</span>

          <h1>Welcome Back</h1>

          <p>Sign in to manage your portfolio.</p>
        </div>

        {/* Login Form */}
        <form
          className="admin-login-form"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>

            <div className="admin-input-wrapper">
              <FaEnvelope />

              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Admin email"
                autoComplete="email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>

            <div className="admin-input-wrapper">
              <FaLock />

              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Admin password"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
            {loading ? (
              "Signing in..."
            ) : (
              <>
                Sign In
                <FaSignInAlt />
              </>
            )}
          </button>
        </form>

        {/* Back */}
        <a href="/" className="back-to-portfolio">
          ← Back to Portfolio
        </a>
      </motion.div>
    </div>
  );
};

export default AdminLogin;