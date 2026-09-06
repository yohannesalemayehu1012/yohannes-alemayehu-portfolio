const pool = require("../config/database");

// ==========================================
// GET ALL PROJECTS
// ==========================================
const getAllProjects = async () => {
    const result = await pool.query(`
        SELECT
            p.*,
            COALESCE(
                JSON_AGG(pt.technology_name)
                FILTER (WHERE pt.id IS NOT NULL),
                '[]'
            ) AS technologies
        FROM projects p
        LEFT JOIN project_technologies pt
            ON p.id = pt.project_id
        GROUP BY p.id
        ORDER BY
            p.featured DESC,
            p.project_date DESC NULLS LAST,
            p.id DESC
    `);

    return result.rows;
};


// ==========================================
// GET PROJECT BY ID
// ==========================================
const getProjectById = async (id) => {
    const result = await pool.query(
        `
        SELECT
            p.*,
            COALESCE(
                JSON_AGG(pt.technology_name)
                FILTER (WHERE pt.id IS NOT NULL),
                '[]'
            ) AS technologies
        FROM projects p
        LEFT JOIN project_technologies pt
            ON p.id = pt.project_id
        WHERE p.id = $1
        GROUP BY p.id
        `,
        [id]
    );

    return result.rows[0];
};


// ==========================================
// GET PROJECT BY SLUG
// ==========================================
const getProjectBySlug = async (slug) => {
    const result = await pool.query(
        `
        SELECT
            p.*,
            COALESCE(
                JSON_AGG(pt.technology_name)
                FILTER (WHERE pt.id IS NOT NULL),
                '[]'
            ) AS technologies
        FROM projects p
        LEFT JOIN project_technologies pt
            ON p.id = pt.project_id
        WHERE p.slug = $1
        GROUP BY p.id
        `,
        [slug]
    );

    return result.rows[0];
};


// ==========================================
// CREATE PROJECT
// ==========================================
const createProject = async (projectData) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const {
            title,
            slug,
            short_description,
            description,
            problem,
            solution,
            challenges,
            image_url,
            github_url,
            live_url,
            category,
            featured,
            project_date,
            technologies = [],
        } = projectData;

        const projectResult = await client.query(
            `
            INSERT INTO projects (
                title,
                slug,
                short_description,
                description,
                problem,
                solution,
                challenges,
                image_url,
                github_url,
                live_url,
                category,
                featured,
                project_date
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, $7,
                $8, $9, $10, $11, $12, $13
            )
            RETURNING *
            `,
            [
                title,
                slug,
                short_description,
                description || null,
                problem || null,
                solution || null,
                challenges || null,
                image_url || null,
                github_url || null,
                live_url || null,
                category || null,
                featured || false,
                project_date || null,
            ]
        );

        const project = projectResult.rows[0];

        // Insert technologies
        for (const technology of technologies) {
            const cleanedTechnology = technology.trim();

            if (cleanedTechnology) {
                await client.query(
                    `
                    INSERT INTO project_technologies
                    (project_id, technology_name)
                    VALUES ($1, $2)
                    `,
                    [project.id, cleanedTechnology]
                );
            }
        }

        await client.query("COMMIT");

        return project;

    } catch (error) {
        await client.query("ROLLBACK");
        throw error;

    } finally {
        client.release();
    }
};


// ==========================================
// UPDATE PROJECT
// ==========================================
const updateProject = async (id, projectData) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const {
            title,
            slug,
            short_description,
            description,
            problem,
            solution,
            challenges,
            image_url,
            github_url,
            live_url,
            category,
            featured,
            project_date,
            technologies = [],
        } = projectData;

        const projectResult = await client.query(
            `
            UPDATE projects
            SET
                title = $1,
                slug = $2,
                short_description = $3,
                description = $4,
                problem = $5,
                solution = $6,
                challenges = $7,
                image_url = $8,
                github_url = $9,
                live_url = $10,
                category = $11,
                featured = $12,
                project_date = $13,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $14
            RETURNING *
            `,
            [
                title,
                slug,
                short_description,
                description || null,
                problem || null,
                solution || null,
                challenges || null,
                image_url || null,
                github_url || null,
                live_url || null,
                category || null,
                featured || false,
                project_date || null,
                id,
            ]
        );

        const project = projectResult.rows[0];

        if (!project) {
            await client.query("ROLLBACK");
            return null;
        }

        // Remove old technologies
        await client.query(
            `
            DELETE FROM project_technologies
            WHERE project_id = $1
            `,
            [id]
        );

        // Insert new technologies
        for (const technology of technologies) {
            const cleanedTechnology = technology.trim();

            if (cleanedTechnology) {
                await client.query(
                    `
                    INSERT INTO project_technologies
                    (project_id, technology_name)
                    VALUES ($1, $2)
                    `,
                    [id, cleanedTechnology]
                );
            }
        }

        await client.query("COMMIT");

        return project;

    } catch (error) {
        await client.query("ROLLBACK");
        throw error;

    } finally {
        client.release();
    }
};


// ==========================================
// DELETE PROJECT
// ==========================================
const deleteProject = async (id) => {
    const result = await pool.query(
        `
        DELETE FROM projects
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
};


module.exports = {
    getAllProjects,
    getProjectById,
    getProjectBySlug,
    createProject,
    updateProject,
    deleteProject,
};