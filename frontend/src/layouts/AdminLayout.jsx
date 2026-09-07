import {
  FaChartPie,
  FaProjectDiagram,
  FaTools,
  FaBriefcase,
  FaGraduationCap,
  FaTrophy,
  FaCertificate,
  FaEnvelope,
  FaLink,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";

import useAuth from "../hooks/useAuth";
import SEO from "../components/SEO";
import BrandMark from "../components/BrandMark";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <FaChartPie />,
      end: true,
    },
    {
      name: "Projects",
      path: "/admin/projects",
      icon: <FaProjectDiagram />,
    },
    {
      name: "Skills",
      path: "/admin/skills",
      icon: <FaTools />,
    },
    {
      name: "Experience",
      path: "/admin/experience",
      icon: <FaBriefcase />,
    },
    {
      name: "Education",
      path: "/admin/education",
      icon: <FaGraduationCap />,
    },
    {
      name: "Achievements",
      path: "/admin/achievements",
      icon: <FaTrophy />,
    },
    {
      name: "Certificates",
      path: "/admin/certificates",
      icon: <FaCertificate />,
    },
    {
      name: "Messages",
      path: "/admin/messages",
      icon: <FaEnvelope />,
    },
    {
      name: "Social Links",
      path: "/admin/social-links",
      icon: <FaLink />,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <FaCog />,
    },
  ];

  const handleLogout = () => {
    logout();

    toast.success("Logged out successfully.");

    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      <SEO
        title="Portfolio Admin"
        description="Portfolio administration panel."
        path="/admin"
        noindex
      />
      {/* Mobile Header */}
      <header className="admin-mobile-header">
        <button
          className="admin-menu-button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle admin menu"
        >
          <FaBars />
        </button>

        <span>Admin Panel</span>
      </header>

      {/* Sidebar */}
      <aside className={sidebarOpen ? "admin-sidebar active" : "admin-sidebar"}>
        <div className="admin-sidebar-header">
          <div className="admin-logo">
            <BrandMark />
          </div>

          <p>Portfolio Admin</p>
        </div>

        <nav className="admin-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                isActive ? "admin-nav-link active" : "admin-nav-link"
              }
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}

              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user">
            <div className="admin-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>

            <div>
              <strong>{user?.name || "Admin"}</strong>

              <span>{user?.email || ""}</span>
            </div>
          </div>

          <button className="admin-logout-button" onClick={handleLogout}>
            <FaSignOutAlt />

            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
