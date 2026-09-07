-- =========================================================
-- YOHANNES ALEMAYEHU PORTFOLIO
-- DATABASE SCHEMA
-- PostgreSQL
-- =========================================================


-- =========================================================
-- 1. USERS
-- =========================================================

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT users_role_check
        CHECK (role IN ('admin'))
);


-- =========================================================
-- 2. PROJECTS
-- =========================================================

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,

    title VARCHAR(200) NOT NULL,

    slug VARCHAR(220) UNIQUE NOT NULL,

    short_description TEXT NOT NULL,

    description TEXT,

    problem TEXT,

    solution TEXT,

    challenges TEXT,

    image_url TEXT,

    github_url TEXT,

    live_url TEXT,

    category VARCHAR(100),

    featured BOOLEAN DEFAULT FALSE,

    project_date DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- 3. PROJECT TECHNOLOGIES
-- =========================================================

CREATE TABLE project_technologies (
    id SERIAL PRIMARY KEY,

    project_id INTEGER NOT NULL,

    technology_name VARCHAR(100) NOT NULL,

    CONSTRAINT fk_project_technologies_project
        FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE
);


-- =========================================================
-- 4. SKILLS
-- =========================================================

CREATE TABLE skills (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    category VARCHAR(100) NOT NULL,

    icon VARCHAR(100),

    description TEXT,

    display_order INTEGER DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- 5. EXPERIENCE
-- =========================================================

CREATE TABLE experience (
    id SERIAL PRIMARY KEY,

    company VARCHAR(200) NOT NULL,

    position VARCHAR(200) NOT NULL,

    description TEXT NOT NULL,

    start_date DATE NOT NULL,

    end_date DATE,

    current_position BOOLEAN DEFAULT FALSE,

    location VARCHAR(200),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- 6. EDUCATION
-- =========================================================

CREATE TABLE education (
    id SERIAL PRIMARY KEY,

    institution VARCHAR(250) NOT NULL,

    degree VARCHAR(200) NOT NULL,

    department VARCHAR(200),

    description TEXT,

    start_date DATE,

    end_date DATE,

    current_education BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- 7. ACHIEVEMENTS
-- =========================================================

CREATE TABLE achievements (
    id SERIAL PRIMARY KEY,

    title VARCHAR(250) NOT NULL,

    description TEXT,

    achievement_date DATE,

    image_url TEXT,

    link_url TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- 8. CERTIFICATES
-- =========================================================

CREATE TABLE certificates (
    id SERIAL PRIMARY KEY,

    title VARCHAR(250) NOT NULL,

    issuer VARCHAR(250) NOT NULL,

    description TEXT,

    issue_date DATE,

    credential_id VARCHAR(200),

    credential_url TEXT,

    image_url TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- 9. MESSAGES
-- =========================================================

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    email VARCHAR(255) NOT NULL,

    subject VARCHAR(250),

    message TEXT NOT NULL,

    status VARCHAR(50) DEFAULT 'unread',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- 10. SOCIAL LINKS
-- =========================================================

CREATE TABLE social_links (
    id SERIAL PRIMARY KEY,

    platform VARCHAR(100) NOT NULL,

    url TEXT NOT NULL,

    icon VARCHAR(100),

    display_order INTEGER DEFAULT 0,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- 11. SITE SETTINGS
-- =========================================================

CREATE TABLE site_settings (
    id SERIAL PRIMARY KEY,

    setting_key VARCHAR(100) UNIQUE NOT NULL,

    setting_value TEXT,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================
-- INDEXES
-- =========================================================

CREATE INDEX idx_projects_slug
ON projects(slug);


CREATE INDEX idx_projects_featured
ON projects(featured);


CREATE INDEX idx_messages_status
ON messages(status);


CREATE INDEX idx_messages_created_at
ON messages(created_at);


-- =========================================================
-- SCHEMA COMPLETE
-- =========================================================