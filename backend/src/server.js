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

// =====================================================
// MIDDLEWARE
// =====================================================

const errorMiddleware = require("./middleware/errorMiddleware");
const { generalLimiter } = require("./middleware/rateLimitMiddleware");
const { ClientSecrets } = require("openai/resources/realtime/client-secrets.js");

// =====================================================
// CREATE EXPRESS APP
// =====================================================

const app = express();

// Render provides PORT.
// Locally it will use 5000.
const PORT = process.env.PORT || 5000;

// =====================================================
// ALLOWED FRONTEND ORIGINS
// =====================================================
//
// IMPORTANT:
// Add FRONTEND_URL in Render environment variables.
// Example:
// FRONTEND_URL=https://your-portfolio.vercel.app
//
// localhost is kept for local React development.
//

const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    process.env.FRONTEND_URL,
].filter(Boolean);

// =====================================================
// SECURITY
// =====================================================

app.use(helmet());

// =====================================================
// CORS
// =====================================================

app.use(
    cors({
        origin: function (origin, callback) {

            // Allow requests without an Origin header.
            // Useful for Postman, server-to-server requests,
            // health checks, etc.
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            console.warn(`CORS blocked origin: ${origin}`);

            return callback(
                new Error("Not allowed by CORS")
            );
        },

        credentials: true,

        methods: [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "OPTIONS",
        ],

        allowedHeaders: [
            "Content-Type",
            "Authorization",
        ],
    })
);

// =====================================================
// RATE LIMITING
// =====================================================

app.use(generalLimiter);

// =====================================================
// REQUEST BODY PARSING
// =====================================================

app.use(
    express.json({
        limit: "100kb",
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: "100kb",
    })
);

// =====================================================
// ROOT ROUTE
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
// DATABASE CONNECTION TEST
// =====================================================

app.get("/api/test-db", async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT NOW()"
        );

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
// DATABASE INFORMATION
// TEMPORARY DEBUG ROUTE
// =====================================================

app.get("/api/db-info", async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT
                current_database() AS database,
                current_user AS user,
                inet_server_addr() AS server,
                inet_server_port() AS port
        `);

        res.status(200).json({
            success: true,
            data: result.rows[0],
        });

    } catch (error) {

        console.error("DB info error:", error);

        res.status(500).json({
            success: false,
            message: "Database information failed",
        });

    }

});

// =====================================================
// DATABASE TABLES
// TEMPORARY DEBUG ROUTE
// =====================================================

app.get("/api/db-tables", async (req, res) => {

    try {

        const databaseResult = await pool.query(`
            SELECT current_database() AS database
        `);

        const tablesResult = await pool.query(`
            SELECT
                table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
            ORDER BY table_name
        `);

        res.status(200).json({
            success: true,
            database: databaseResult.rows[0].database,
            tables: tablesResult.rows.map(
                (row) => row.table_name
            ),
        });

    } catch (error) {

        console.error("DB tables error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to retrieve database tables",
        });

    }

});

// =====================================================
// API ROUTES
// =====================================================

// -----------------------------------------------------
// Authentication
// -----------------------------------------------------

app.use(
    "/api/auth",
    authRoutes
);

// -----------------------------------------------------
// Projects
// -----------------------------------------------------

app.use(
    "/api/projects",
    projectRoutes
);

// -----------------------------------------------------
// Skills
// -----------------------------------------------------

app.use(
    "/api/skills",
    skillRoutes
);

// -----------------------------------------------------
// Experience
// -----------------------------------------------------

app.use(
    "/api/experience",
    experienceRoutes
);

// -----------------------------------------------------
// Education
// -----------------------------------------------------

app.use(
    "/api/education",
    educationRoutes
);

// -----------------------------------------------------
// Achievements
// -----------------------------------------------------

app.use(
    "/api/achievements",
    achievementRoutes
);

// -----------------------------------------------------
// Certificates
// -----------------------------------------------------

app.use(
    "/api/certificates",
    certificateRoutes
);

// -----------------------------------------------------
// Messages
// -----------------------------------------------------

app.use(
    "/api/messages",
    messageRoutes
);

// -----------------------------------------------------
// Social Links
// -----------------------------------------------------

app.use(
    "/api/social-links",
    socialRoutes
);

// -----------------------------------------------------
// Site Settings
// -----------------------------------------------------

app.use(
    "/api/settings",
    settingRoutes
);

// -----------------------------------------------------
// Dashboard
// -----------------------------------------------------

app.use(
    "/api/dashboard",
    dashboardRoutes
);

// -----------------------------------------------------
// AI Chatbot
// -----------------------------------------------------

app.use(
    "/api/chatbot",
    chatbotRoutes
);

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
// START SERVER
// =====================================================

app.listen(PORT, "0.0.0.0", () => {

    console.log(`
========================================
🚀 Yohannes Portfolio API
========================================
Port: ${PORT}
Environment: ${process.env.NODE_ENV || "development"}
Database: PostgreSQL
Host: 0.0.0.0
========================================
    `);

});