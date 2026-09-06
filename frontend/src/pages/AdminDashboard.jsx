import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaProjectDiagram,
  FaTools,
  FaBriefcase,
  FaGraduationCap,
  FaTrophy,
  FaCertificate,
  FaEnvelope,
  FaEnvelopeOpen,
} from "react-icons/fa";

import useAuth from "../hooks/useAuth";
import { getDashboard } from "../services/dashboardService";

import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user, token } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getDashboard(token);

        if (result.success) {
          setDashboard(result.data);
        } else {
          setError("Failed to load dashboard data.");
        }
      } catch (err) {
        console.error("Dashboard error:", err);

        setError(
          err.response?.data?.message || "Failed to load dashboard data.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      loadDashboard();
    }
  }, [token]);

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="dashboard-loading">
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="dashboard-error">
          <h2>Unable to load dashboard</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return null;
  }

  const { stats, recentMessages, recentProjects } = dashboard;

  const statCards = [
    {
      title: "Projects",
      value: stats.projects,
      icon: <FaProjectDiagram />,
      link: "/admin/projects",
    },
    {
      title: "Skills",
      value: stats.skills,
      icon: <FaTools />,
      link: "/admin/skills",
    },
    {
      title: "Experience",
      value: stats.experience,
      icon: <FaBriefcase />,
      link: "/admin/experience",
    },
    {
      title: "Education",
      value: stats.education,
      icon: <FaGraduationCap />,
      link: "/admin/education",
    },
    {
      title: "Achievements",
      value: stats.achievements,
      icon: <FaTrophy />,
      link: "/admin/achievements",
    },
    {
      title: "Certificates",
      value: stats.certificates,
      icon: <FaCertificate />,
      link: "/admin/certificates",
    },
    {
      title: "Messages",
      value: stats.messages,
      icon: <FaEnvelope />,
      link: "/admin/messages",
    },
    {
      title: "Unread Messages",
      value: stats.unreadMessages,
      icon: <FaEnvelopeOpen />,
      link: "/admin/messages",
    },
  ];

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <span className="dashboard-label">ADMIN DASHBOARD</span>

          <h1>Welcome back, {user?.name || "Admin"} 👋</h1>

          <p>
            Manage your portfolio content and monitor your website activity from
            one place.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <section className="dashboard-stats">
        {statCards.map((card) => (
          <Link to={card.link} className="dashboard-stat-card" key={card.title}>
            <div className="stat-icon">{card.icon}</div>

            <div className="stat-content">
              <span>{card.title}</span>
              <strong>{card.value}</strong>
            </div>
          </Link>
        ))}
      </section>

      {/* Recent Data */}
      <section className="dashboard-content">
        {/* Recent Messages */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <div>
              <span className="panel-label">COMMUNICATION</span>

              <h2>Recent Messages</h2>
            </div>

            <Link to="/admin/messages">View all</Link>
          </div>

          {recentMessages.length === 0 ? (
            <div className="empty-state">
              <FaEnvelope />
              <p>No messages yet.</p>
            </div>
          ) : (
            <div className="message-list">
              {recentMessages.map((message) => (
                <div className="message-item" key={message.id}>
                  <div className="message-avatar">
                    {message.name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="message-info">
                    <h3>{message.name}</h3>

                    <p>{message.subject || "No subject"}</p>

                    <span>{formatDate(message.created_at)}</span>
                  </div>

                  <span className={`message-status ${message.status}`}>
                    {message.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Projects */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <div>
              <span className="panel-label">PORTFOLIO</span>

              <h2>Recent Projects</h2>
            </div>

            <Link to="/admin/projects">View all</Link>
          </div>

          {recentProjects.length === 0 ? (
            <div className="empty-state">
              <FaProjectDiagram />
              <p>No projects yet.</p>
            </div>
          ) : (
            <div className="project-list">
              {recentProjects.map((project) => (
                <div className="project-item" key={project.id}>
                  <div className="project-info">
                    <h3>{project.title}</h3>

                    <p>{project.category || "Uncategorized"}</p>

                    <span>
                      {formatDate(project.project_date || project.created_at)}
                    </span>
                  </div>

                  {project.featured && (
                    <span className="featured-badge">Featured</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
