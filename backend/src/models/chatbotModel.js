const pool = require("../config/database");

const getPortfolioContext = async () => {
    const [
        projectsResult,
        skillsResult,
        experienceResult,
        educationResult,
        achievementsResult,
        certificatesResult,
        socialLinksResult,
        settingsResult,
    ] = await Promise.all([
        pool.query(`
            SELECT
                p.id,
                p.title,
                p.slug,
                p.short_description,
                p.description,
                p.problem,
                p.solution,
                p.challenges,
                p.category,
                p.featured,
                p.project_date,
                p.github_url,
                p.live_url,
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
        `),

        pool.query(`
            SELECT
                id,
                name,
                category,
                description,
                display_order
            FROM skills
            ORDER BY
                display_order ASC,
                id ASC
        `),

        pool.query(`
            SELECT
                id,
                company,
                position,
                description,
                start_date,
                end_date,
                current_position,
                location
            FROM experience
            ORDER BY
                start_date DESC NULLS LAST,
                id DESC
        `),

        pool.query(`
            SELECT
                id,
                institution,
                degree,
                department,
                description,
                start_date,
                end_date,
                current_education
            FROM education
            ORDER BY
                start_date DESC NULLS LAST,
                id DESC
        `),

        pool.query(`
            SELECT
                id,
                title,
                description,
                achievement_date,
                link_url
            FROM achievements
            ORDER BY
                achievement_date DESC NULLS LAST,
                id DESC
        `),

        pool.query(`
            SELECT
                id,
                title,
                issuer,
                description,
                issue_date,
                credential_id,
                credential_url
            FROM certificates
            ORDER BY
                issue_date DESC NULLS LAST,
                id DESC
        `),

        pool.query(`
            SELECT
                platform,
                url
            FROM social_links
            WHERE is_active = TRUE
            ORDER BY
                display_order ASC,
                id ASC
        `),

        pool.query(`
            SELECT
                setting_key,
                setting_value
            FROM site_settings
            WHERE setting_key IN (
                'site_name',
                'professional_title',
                'hero_description',
                'about_description',
                'email',
                'phone',
                'location',
                'availability'
            )
            ORDER BY setting_key
        `),
    ]);

    return {
        projects: projectsResult.rows,
        skills: skillsResult.rows,
        experience: experienceResult.rows,
        education: educationResult.rows,
        achievements: achievementsResult.rows,
        certificates: certificatesResult.rows,
        socialLinks: socialLinksResult.rows,
        settings: settingsResult.rows,
    };
};

module.exports = {
    getPortfolioContext,
};