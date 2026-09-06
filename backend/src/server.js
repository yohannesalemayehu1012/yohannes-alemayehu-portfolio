const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const pool = require("./config/database");

// =====================================================
// ROUTES
// =====================================================

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const educationRoutes = require("./routes/educationRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const messageRoutes = require("./routes/messageRoutes");
const socialRoutes = require("./routes/socialRoutes");
const settingRoutes = require("./routes/settingRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
const chatbotRoutes = require("./routes/chatbotRoutes");
const { generalLimiter } = require("./middleware/rateLimitMiddleware");
// =====================================================
// APP
// =====================================================

const app = express();

const PORT = process.env.PORT || 5000;

// =====================================================
// MIDDLEWARE
// =====================================================

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(helmet());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(generalLimiter);

app.use(express.json({ limit: "100kb" }));

app.use(express.urlencoded({ extended: true }));

// =====================================================
// HOME
// =====================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Yohannes Portfolio API is running 🚀",
  });
});

// =====================================================
// DATABASE TEST
// =====================================================

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.status(200).json({
      success: true,
      message: "PostgreSQL connected successfully!",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error("Database Error:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// =====================================================
// API ROUTES
// =====================================================

// Authentication
app.use("/api/auth", authRoutes);

// Projects
app.use("/api/projects", projectRoutes);

// Skills
app.use("/api/skills", skillRoutes);

// Experience
app.use("/api/experience", experienceRoutes);

// Education
app.use("/api/education", educationRoutes);

// Achievements
app.use("/api/achievements", achievementRoutes);

// Certificates
app.use("/api/certificates", certificateRoutes);

// Messages
app.use("/api/messages", messageRoutes);

// Social Links
app.use("/api/social-links", socialRoutes);

// Site Settings
app.use("/api/settings", settingRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/chatbot", chatbotRoutes);

// =====================================================
// 404 - ROUTE NOT FOUND
// =====================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

app.use(errorMiddleware);

// =====================================================
// SERVER
// =====================================================

app.listen(PORT, () => {
  console.log(`
========================================
🚀 Yohannes Portfolio API
========================================
Server: http://localhost:${PORT}
Database: PostgreSQL
Environment: ${process.env.NODE_ENV || "development"}
========================================
    `);
});
