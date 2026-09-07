const { Pool } = require("pg");

require("dotenv").config();

const isProductionDatabase =
  process.env.DATABASE_URL &&
  !process.env.DATABASE_URL.includes("localhost");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

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