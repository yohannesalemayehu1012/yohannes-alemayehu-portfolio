const pool = require("../config/database");


// =====================================================
// FIND USER BY EMAIL
// =====================================================

const getUserByEmail = async (email) => {

    const result = await pool.query(
        `
        SELECT
            id,
            name,
            email,
            password_hash,
            role,
            created_at
        FROM users
        WHERE email = $1
        `,
        [email]
    );

    return result.rows[0];
};


// =====================================================
// FIND USER BY ID
// =====================================================

const getUserById = async (id) => {

    const result = await pool.query(
        `
        SELECT
            id,
            name,
            email,
            role,
            created_at
        FROM users
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
};


// =====================================================
// CREATE USER
// =====================================================

const createUser = async (name, email, passwordHash, role = "admin") => {

    const result = await pool.query(
        `
        INSERT INTO users (
            name,
            email,
            password_hash,
            role
        )
        VALUES ($1, $2, $3, $4)
        RETURNING
            id,
            name,
            email,
            role,
            created_at
        `,
        [
            name,
            email,
            passwordHash,
            role
        ]
    );

    return result.rows[0];
};


module.exports = {
    getUserByEmail,
    getUserById,
    createUser
};