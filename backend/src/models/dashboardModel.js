const pool = require("../config/database");

const getDashboardStats = async () => {
  const result = await pool.query(`
        SELECT
            (SELECT COUNT(*) FROM projects) AS projects,
            (SELECT COUNT(*) FROM skills) AS skills,
            (SELECT COUNT(*) FROM experience) AS experience,
            (SELECT COUNT(*) FROM education) AS education,
            (SELECT COUNT(*) FROM achievements) AS achievements,
            (SELECT COUNT(*) FROM certificates) AS certificates,
            (SELECT COUNT(*) FROM messages) AS messages,
            (SELECT COUNT(*) FROM messages WHERE status = 'unread') AS unread_messages
    `);

  return result.rows[0];
};

const getRecentMessages = async () => {
  const result = await pool.query(`
        SELECT id, name, email, subject, status, created_at
        FROM messages
        ORDER BY created_at DESC
        LIMIT 5
    `);

  return result.rows;
};

const getRecentProjects = async () => {
  const result = await pool.query(`
        SELECT id, title, slug, category, featured, project_date, created_at
        FROM projects
        ORDER BY created_at DESC
        LIMIT 5
    `);

  return result.rows;
};

module.exports = {
  getDashboardStats,
  getRecentMessages,
  getRecentProjects,
};
