-- =========================================================
-- YOHANNES ALEMAYEHU PORTFOLIO
-- DATABASE SEED DATA
-- PostgreSQL
-- =========================================================


-- =========================================================
-- 1. PROJECTS
-- =========================================================

INSERT INTO projects (
    title,
    slug,
    short_description,
    description,
    problem,
    solution,
    challenges,
    category,
    featured,
    project_date
)
VALUES

(
    'School Management System',
    'school-management-system',

    'A full-stack platform for managing students, courses, examinations and academic records.',

    'A complete school management application designed to simplify and centralize academic and administrative operations.',

    'Schools need an organized way to manage student information, courses, examinations and academic records.',

    'Built a centralized web-based system where authorized users can manage academic information.',

    'Designing the database relationships and implementing authentication and role-based access control.',

    'Full Stack',

    TRUE,

    '2026-01-01'
),

(
    'Hospital Management System',
    'hospital-management-system',

    'A management system for organizing hospital-related information and workflows.',

    'A web application designed to improve the management of hospital information.',

    'Manual management of hospital records can be inefficient and difficult to maintain.',

    'Created a centralized application for managing hospital data.',

    'Designing CRUD operations and maintaining data consistency.',

    'Full Stack',

    TRUE,

    '2025-01-01'
),

(
    'Machine Learning Prediction System',
    'machine-learning-prediction-system',

    'A machine learning application for making predictions from structured datasets.',

    'A Python-based machine learning project involving data preprocessing, model training and prediction.',

    'Raw datasets need to be processed and analyzed before machine learning models can produce useful predictions.',

    'Built a machine learning workflow using Python and Scikit-learn.',

    'Data preprocessing, model selection and evaluating model performance.',

    'AI / Machine Learning',

    TRUE,

    '2026-01-01'
);


-- =========================================================
-- 2. PROJECT TECHNOLOGIES
-- =========================================================

INSERT INTO project_technologies (
    project_id,
    technology_name
)
SELECT
    p.id,
    technology_name
FROM projects p
CROSS JOIN (
    VALUES
        ('school-management-system', 'React'),
        ('school-management-system', 'Node.js'),
        ('school-management-system', 'Express.js'),
        ('school-management-system', 'PostgreSQL'),

        ('hospital-management-system', 'PHP'),
        ('hospital-management-system', 'MySQL'),
        ('hospital-management-system', 'HTML'),
        ('hospital-management-system', 'CSS'),

        ('machine-learning-prediction-system', 'Python'),
        ('machine-learning-prediction-system', 'Pandas'),
        ('machine-learning-prediction-system', 'Scikit-learn'),
        ('machine-learning-prediction-system', 'XGBoost')
) AS technology_data(slug, technology_name)
WHERE p.slug = technology_data.slug;


-- =========================================================
-- 3. SKILLS
-- =========================================================

INSERT INTO skills (
    name,
    category,
    icon,
    description,
    display_order
)
VALUES

('JavaScript',
 'Programming',
 'javascript',
 'Modern JavaScript development.',
 1),

('Python',
 'Programming',
 'python',
 'Python programming and data science.',
 2),

('C#',
 'Programming',
 'csharp',
 'C# and application development.',
 3),

('SQL',
 'Programming',
 'database',
 'Relational database querying.',
 4),


('React',
 'Frontend',
 'react',
 'Building modern user interfaces with React.',
 1),

('Vite',
 'Frontend',
 'vite',
 'Fast frontend development tooling.',
 2),

('Tailwind CSS',
 'Frontend',
 'tailwind',
 'Utility-first CSS framework.',
 3),


('Node.js',
 'Backend',
 'nodejs',
 'Server-side JavaScript development.',
 1),

('Express.js',
 'Backend',
 'express',
 'REST API development with Express.',
 2),

('REST API',
 'Backend',
 'api',
 'Designing and consuming RESTful APIs.',
 3),


('PostgreSQL',
 'Database',
 'postgresql',
 'Relational database design and SQL.',
 1),

('MySQL',
 'Database',
 'mysql',
 'Relational database management.',
 2),

('MongoDB',
 'Database',
 'mongodb',
 'NoSQL database development.',
 3),


('Pandas',
 'AI / ML',
 'pandas',
 'Data manipulation and analysis.',
 1),

('Scikit-learn',
 'AI / ML',
 'sklearn',
 'Machine learning model development.',
 2),

('XGBoost',
 'AI / ML',
 'xgboost',
 'Gradient boosting machine learning.',
 3),


('Git',
 'Tools',
 'git',
 'Version control.',
 1),

('GitHub',
 'Tools',
 'github',
 'Source code management and collaboration.',
 2),

('Postman',
 'Tools',
 'postman',
 'API testing and development.',
 3);


-- =========================================================
-- 4. EDUCATION
-- =========================================================

INSERT INTO education (
    institution,
    degree,
    department,
    description,
    start_date,
    current_education
)
VALUES (
    'Arba Minch University',

    'Bachelor of Science in Software Engineering',

    'Software Engineering',

    'Studying software engineering with a focus on software development, programming, databases and modern computing technologies.',

    '2023-01-01',

    TRUE
);


-- =========================================================
-- 5. EXPERIENCE
-- =========================================================

INSERT INTO experience (
    company,
    position,
    description,
    start_date,
    end_date,
    current_position,
    location
)
VALUES

(
    'Future Interns',

    'Machine Learning Intern',

    'Worked on machine learning projects involving data preprocessing, model development and evaluation.',

    '2026-01-01',

    NULL,

    FALSE,

    'Remote'
),

(
    'HexSoftwares',

    'Software Development Intern',

    'Worked on software development tasks and practical programming projects.',

    '2026-01-01',

    NULL,

    FALSE,

    'Remote'
);


-- =========================================================
-- 6. SOCIAL LINKS
-- =========================================================

INSERT INTO social_links (
    platform,
    url,
    icon,
    display_order
)
VALUES

(
    'GitHub',
    'https://github.com/',
    'github',
    1
),

(
    'LinkedIn',
    'https://www.linkedin.com/',
    'linkedin',
    2
),

(
    'Email',
    'mailto:your-email@example.com',
    'email',
    3
);


-- =========================================================
-- 7. SITE SETTINGS
-- =========================================================

INSERT INTO site_settings (
    setting_key,
    setting_value
)
VALUES

(
    'site_name',
    'Yohannes Alemayehu'
),

(
    'professional_title',
    'Software Engineer'
),

(
    'hero_description',
    'I build modern web applications and practical software solutions using React, Node.js, PostgreSQL and Python.'
),

(
    'about_description',
    'I am a Software Engineering student and full-stack developer passionate about building practical digital solutions.'
),

(
    'location',
    'Ethiopia'
),

(
    'availability',
    'Open to opportunities'
),

(
    'email',
    'your-email@example.com'
),

(
    'phone',
    '+251000000000'
),

(
    'resume_url',
    '/resume.pdf'
),

(
    'footer_text',
    '© 2026 Yohannes Alemayehu. All rights reserved.'
)

 