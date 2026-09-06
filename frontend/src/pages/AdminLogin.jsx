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

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      toast.error("Enter a valid email.");
      return;
    }

    if (!formData.password) {
      toast.error("Please enter your password.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const result = await loginAdmin(formData);

      if (result.success) {
        login(result.user, result.token);

        toast.success("Login successful!");

        navigate("/admin");
      } else {
        toast.error(result.message || "Login failed.");
      }
    } catch (error) {
      console.error("Admin login failed:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to connect to the login server.",
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
        <div className="admin-login-header">
          <div className="admin-login-icon">
            <FaLock />
          </div>

          <span className="section-label">ADMIN AREA</span>

          <h1>Welcome Back</h1>

          <p>Sign in to manage your portfolio.</p>
        </div>

        <form className="admin-login-form" onSubmit={handleSubmit}>
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
                minLength={6}
                required
              />
            </div>
          </div>

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

        <a href="/" className="back-to-portfolio">
          ← Back to Portfolio
        </a>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
