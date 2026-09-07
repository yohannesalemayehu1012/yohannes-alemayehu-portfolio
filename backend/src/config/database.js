const { Pool } = require("pg");

require("dotenv").config();

const databaseUrl = process.env.DATABASE_URL || null;
const databaseConfig = databaseUrl
  ? { connectionString: databaseUrl }
  : {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 5432),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    };

const isProductionDatabase =
  process.env.NODE_ENV === "production" ||
  Boolean(databaseUrl && !databaseUrl.includes("localhost"));

const pool = new Pool({
  ...databaseConfig,

  // Render PostgreSQL external connections require SSL/TLS.
  // Local PostgreSQL does not normally require SSL.
  ssl: isProductionDatabase
    ? {
        rejectUnauthorized: false,
      }
    : false,

  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on("connect", () => {
  console.log("📦 PostgreSQL client connected");
});

pool.on("error", (error) => {
  console.error("❌ PostgreSQL error:", error);
});

module.exports = pool;
