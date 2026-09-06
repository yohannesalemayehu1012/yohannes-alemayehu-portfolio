const pool = require("../config/database");

// Get all messages
const getAllMessages = async () => {
  const result = await pool.query(`
        SELECT *
        FROM messages
        ORDER BY created_at DESC, id DESC
    `);

  return result.rows;
};

// Get message by ID
const getMessageById = async (id) => {
  const result = await pool.query(
    `
        SELECT *
        FROM messages
        WHERE id = $1
        `,
    [id],
  );

  return result.rows[0];
};

// Create a new message
const createMessage = async (messageData) => {
  const { name, email, subject, message } = messageData;

  const result = await pool.query(
    `
        INSERT INTO messages (
            name,
            email,
            subject,
            message
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
    [name, email, subject || null, message],
  );

  return result.rows[0];
};

// Update message status
const updateMessageStatus = async (id, status) => {
  const result = await pool.query(
    `
        UPDATE messages
        SET
            status = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *
        `,
    [status, id],
  );

  return result.rows[0];
};

// Delete message
const deleteMessage = async (id) => {
  const result = await pool.query(
    `
        DELETE FROM messages
        WHERE id = $1
        RETURNING *
        `,
    [id],
  );

  return result.rows[0];
};

module.exports = {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessageStatus,
  deleteMessage,
};
