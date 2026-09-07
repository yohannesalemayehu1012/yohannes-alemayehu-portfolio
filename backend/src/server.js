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
const chatbotRoutes = require("./routes/chatbotRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");
const { generalLimiter } = require("./middleware/rateLimitMiddleware");

// =====================================================
// APP
// =====================================================

const app = express();

const PORT = process.env.PORT || 5000;

// =====================================================
// MIDDLEWARE
// =====================================================

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

// Security
app.use(helmet());

// CORS
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

// Rate limiting
app.use(generalLimiter);

// Request body parsing
app.use(express.json({ limit: "100kb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "100kb",
  }),
);

// =====================================================
// HOME / ROOT
// =====================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Yohannes Portfolio API is running 🚀",
    environment: process.env.NODE_ENV || "development",
  });
});

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Portfolio API is healthy",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
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

// Dashboard
app.use("/api/dashboard", dashboardRoutes);

// AI Chatbot
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

// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================

app.use(errorMiddleware);

// =====================================================
// SERVER
// =====================================================

app.listen(PORT, "0.0.0.0", () => {
  console.log(`
========================================
🚀 Yohannes Portfolio API
========================================
Server: http://localhost:${PORT}
Environment: ${process.env.NODE_ENV || "development"}
Database: PostgreSQL
Host: 0.0.0.0
========================================
  `);
});
