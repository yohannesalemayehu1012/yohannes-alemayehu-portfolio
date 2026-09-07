-- Yohannes Alemayehu portfolio seed data.
-- Development admin password: Admin@123

INSERT INTO users (name, email, password_hash, role)
VALUES (
    'Yohannes Alemayehu',
    'yohannesalemayehu1012@gmail.com',
    '$2b$12$jI0Z.rifx3qWZ3gETnnhR.EBNoy7k3a/Agv7VawHl1Z.0Ot4BI/UW',
    'admin'
)
ON CONFLICT (email) DO NOTHING;

INSERT INTO projects (
    title, slug, short_description, description, problem, solution,
    challenges, category, featured, project_date
)
VALUES
(
    'Portfolio Website', 'portfolio-website',
    'A professional full-stack portfolio website for showcasing software engineering work.',
    'A responsive portfolio platform with a public website and authenticated admin dashboard.',
    'Portfolio content should be easy to discover and simple to maintain.',
    'Built a React and Node.js application backed by PostgreSQL with protected CRUD screens.',
    'Connecting public content sections to reusable API services and secure admin workflows.',
    'Full Stack', TRUE, '2026-02-01'
),
(
    'School Management System', 'school-management-system',
    'A full-stack platform for managing students, courses, examinations and academic records.',
    'A complete school management application designed to simplify academic operations.',
    'Schools need an organized way to manage student and academic records.',
    'Built a centralized web-based system for authorized academic data management.',
    'Designing database relationships and implementing authentication and role-based access control.',
    'Full Stack', TRUE, '2026-01-01'
),
(
    'Hospital Management System', 'hospital-management-system',
    'A management system for organizing hospital-related information and workflows.',
    'A web application designed to improve the management of hospital information.',
    'Manual hospital records can be inefficient and difficult to maintain.',
    'Created a centralized application for managing hospital data.',
    'Designing CRUD operations and maintaining data consistency.',
    'Full Stack', TRUE, '2025-01-01'
),
(
    'Machine Learning Prediction System', 'machine-learning-prediction-system',
    'A machine learning application for making predictions from structured datasets.',
    'A Python project involving data preprocessing, model training and prediction.',
    'Raw datasets must be processed before models can produce useful predictions.',
    'Built a machine learning workflow using Python and Scikit-learn.',
    'Data preprocessing, model selection and evaluating model performance.',
    'AI / Machine Learning', TRUE, '2026-01-01'
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO project_technologies (project_id, technology_name)
SELECT p.id, technology_data.technology_name
FROM projects p
JOIN (
    VALUES
        ('portfolio-website', 'React'),
        ('portfolio-website', 'Node.js'),
        ('portfolio-website', 'Express.js'),
        ('portfolio-website', 'PostgreSQL'),
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
) AS technology_data(slug, technology_name) ON technology_data.slug = p.slug
WHERE NOT EXISTS (
    SELECT 1
    FROM project_technologies existing
    WHERE existing.project_id = p.id
      AND existing.technology_name = technology_data.technology_name
);

INSERT INTO skills (name, category, icon, description, display_order)
SELECT seed.name, seed.category, seed.icon, seed.description, seed.display_order
FROM (
    VALUES
        ('JavaScript', 'Programming', 'javascript', 'Modern JavaScript development.', 1),
        ('Python', 'Programming', 'python', 'Python programming and data science.', 2),
        ('C#', 'Programming', 'csharp', 'C# and application development.', 3),
        ('SQL', 'Programming', 'database', 'Relational database querying.', 4),
        ('React', 'Frontend', 'react', 'Building modern user interfaces with React.', 1),
        ('Vite', 'Frontend', 'vite', 'Fast frontend development tooling.', 2),
        ('Tailwind CSS', 'Frontend', 'tailwind', 'Utility-first CSS framework.', 3),
        ('Node.js', 'Backend', 'nodejs', 'Server-side JavaScript development.', 1),
        ('Express.js', 'Backend', 'express', 'REST API development with Express.', 2),
        ('REST API', 'Backend', 'api', 'Designing and consuming RESTful APIs.', 3),
        ('PostgreSQL', 'Database', 'postgresql', 'Relational database design and SQL.', 1),
        ('MySQL', 'Database', 'mysql', 'Relational database management.', 2),
        ('MongoDB', 'Database', 'mongodb', 'NoSQL database development.', 3),
        ('Pandas', 'AI / ML', 'pandas', 'Data manipulation and analysis.', 1),
        ('Scikit-learn', 'AI / ML', 'sklearn', 'Machine learning model development.', 2),
        ('XGBoost', 'AI / ML', 'xgboost', 'Gradient boosting machine learning.', 3),
        ('Git', 'Tools', 'git', 'Version control.', 1),
        ('GitHub', 'Tools', 'github', 'Source code management and collaboration.', 2),
        ('Postman', 'Tools', 'postman', 'API testing and development.', 3)
) AS seed(name, category, icon, description, display_order)
WHERE NOT EXISTS (
    SELECT 1 FROM skills existing
    WHERE existing.name = seed.name AND existing.category = seed.category
);

INSERT INTO education (
    institution, degree, department, description, start_date, current_education
)
SELECT *
FROM (
    VALUES (
        'Arba Minch University',
        'Bachelor of Science in Software Engineering',
        'Software Engineering',
        'Studying software engineering with a focus on software development, programming, databases and modern computing technologies.',
        '2023-01-01'::DATE,
        TRUE
    )
) AS seed(institution, degree, department, description, start_date, current_education)
WHERE NOT EXISTS (
    SELECT 1 FROM education existing
    WHERE existing.institution = seed.institution AND existing.degree = seed.degree
);

INSERT INTO experience (
    company, position, description, start_date, end_date, current_position, location
)
SELECT seed.company, seed.position, seed.description, seed.start_date,
       seed.end_date, seed.current_position, seed.location
FROM (
    VALUES
        ('Future Interns', 'Machine Learning Intern', 'Worked on machine learning projects involving data preprocessing, model development and evaluation.', '2026-01-01'::DATE, NULL::DATE, FALSE, 'Remote'),
        ('HexSoftwares', 'Software Development Intern', 'Worked on software development tasks and practical programming projects.', '2025-12-01'::DATE, NULL::DATE, FALSE, 'Remote'),
        ('HexSoftwares', 'Full-Stack Developer Intern', 'Worked on full-stack web development projects, implementing responsive interfaces, REST APIs, database integration and authentication features.', '2026-09-01'::DATE, NULL::DATE, TRUE, 'Remote')
) AS seed(company, position, description, start_date, end_date, current_position, location)
WHERE NOT EXISTS (
    SELECT 1 FROM experience existing
    WHERE existing.company = seed.company AND existing.position = seed.position
);

INSERT INTO achievements (title, description, achievement_date, image_url, link_url)
SELECT seed.title, seed.description, seed.achievement_date, seed.image_url, seed.link_url
FROM (
    VALUES
        ('Hackathon Participation', 'Participated in a software development hackathon and worked on an innovative technology solution.', '2026-09-01'::DATE, 'https://res.cloudinary.com/rshumzz5/image/upload/v1786070401/cld-sample.jpg', 'https://www.apple.com/'),
        ('Software Development Achievement', 'Completed a software development project demonstrating full-stack development and database integration.', '2026-01-01'::DATE, NULL::TEXT, NULL::TEXT)
) AS seed(title, description, achievement_date, image_url, link_url)
WHERE NOT EXISTS (
    SELECT 1 FROM achievements existing WHERE existing.title = seed.title
);

INSERT INTO certificates (
    title, issuer, description, issue_date, credential_id, credential_url, image_url
)
SELECT seed.title, seed.issuer, seed.description, seed.issue_date,
       seed.credential_id, seed.credential_url, seed.image_url
FROM (
    VALUES (
        'Android Developer Fundamentals', 'Udacity',
        'Udacity has confirmed my participation in this program and learning experience.',
        '2025-07-01'::DATE, 'ab9de294-5e62-11f0-b382-f745222df814',
        'https://www.udacity.com/certificate/e/ab9de294-5e62-11f0-b382-f745222df814',
        'https://res.cloudinary.com/rshumzz5/image/upload/v1788557579/Android_Developer_Fundamentals_vtfrac.jpg'
    )
) AS seed(title, issuer, description, issue_date, credential_id, credential_url, image_url)
WHERE NOT EXISTS (
    SELECT 1 FROM certificates existing WHERE existing.credential_id = seed.credential_id
);

INSERT INTO social_links (platform, url, icon, display_order, is_active)
SELECT seed.platform, seed.url, seed.icon, seed.display_order, TRUE
FROM (
    VALUES
        ('GitHub', 'https://github.com/yohannesalemayehu1012', 'github', 1),
        ('LinkedIn', 'https://www.linkedin.com/', 'linkedin', 2),
        ('Email', 'mailto:yohannesalemayehu1012@gmail.com', 'email', 3)
) AS seed(platform, url, icon, display_order)
WHERE NOT EXISTS (
    SELECT 1 FROM social_links existing WHERE existing.platform = seed.platform
);

INSERT INTO site_settings (setting_key, setting_value)
VALUES
    ('site_name', 'Yohannes Alemayehu'),
    ('site_title', 'Yohannes Alemayehu | Software Engineer'),
    ('professional_title', 'Software Engineering Student & Full-Stack Developer'),
    ('hero_title', 'Building digital solutions for real-world problems.'),
    ('hero_description', 'I build modern web applications and practical software solutions using React, Node.js, PostgreSQL and Python.'),
    ('about_description', 'I am a Software Engineering student and full-stack developer passionate about building practical digital solutions.'),
    ('location', 'Ethiopia'),
    ('availability', 'Open to internships, freelance projects and junior software development opportunities.'),
    ('email', 'yohannesalemayehu1012@gmail.com'),
    ('phone', '+251953035274'),
    ('resume_url', '/resume.pdf'),
    ('footer_text', '© 2026 Yohannes Alemayehu. All rights reserved.')
ON CONFLICT (setting_key)
DO UPDATE SET setting_value = EXCLUDED.setting_value, updated_at = CURRENT_TIMESTAMP;
