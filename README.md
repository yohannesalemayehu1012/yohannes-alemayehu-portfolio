# Yohannes Alemayehu — Software Engineer Portfolio

A modern, full-stack personal portfolio website built to showcase my software engineering projects, technical skills, professional experience, education, achievements, certificates, and contact information.

The application includes a secure admin dashboard for managing portfolio content and an AI-powered portfolio chatbot that can answer questions about my professional background and projects.

---

## 🌐 Live Application

**Portfolio:**
https://yohannes-alemayehu-portfolio.vercel.app

**Backend API:**
Hosted on Render.

---

## 👨‍💻 About

I am **Yohannes Alemayehu**, a Software Engineering student and full-stack developer interested in building modern, scalable, secure, and user-friendly software applications.

My primary areas of interest include:

* Full-Stack Web Development
* React.js
* Node.js
* Express.js
* PostgreSQL
* REST APIs
* Authentication & Authorization
* Artificial Intelligence
* Machine Learning
* UI/UX Design

This portfolio was developed as a real-world full-stack application rather than a static portfolio website.

---

# 🚀 Features

## Public Portfolio

Visitors can explore:

* Home
* About Me
* Skills
* Projects
* Project Details
* Experience
* Education
* Achievements
* Certificates
* Resume
* Contact
* Social Media Links

---

## 🔐 Admin Dashboard

The application includes a protected administration area.

Administrators can manage:

* Projects
* Skills
* Experience
* Education
* Achievements
* Certificates
* Social links
* Website settings
* Contact messages

Admin authentication is protected using:

* JWT
* Password hashing with bcrypt
* Protected routes
* Role-based authorization

---

## 🤖 AI Portfolio Chatbot

The portfolio includes an AI-powered chatbot that allows visitors to ask questions about my professional profile.

Example questions:

```text
What technologies does Yohannes know?

What projects has Yohannes built?

Tell me about the School Management System.

What is Yohannes's education?

Does Yohannes have experience with React?

How can I contact Yohannes?
```

The chatbot uses portfolio information from the database as context.

The chatbot is designed to:

* Answer portfolio-related questions
* Use database information
* Avoid exposing private information
* Avoid inventing portfolio information
* Provide fallback responses if AI is unavailable
* Limit excessive requests using rate limiting

---

# 🏗️ System Architecture

The application follows a client-server architecture.

```text
                         ┌─────────────────────┐
                         │       Visitor       │
                         └──────────┬──────────┘
                                    │
                                    ↓
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │       Vite          │
                         └──────────┬──────────┘
                                    │
                              Axios / REST
                                    │
                                    ↓
                         ┌─────────────────────┐
                         │   Express Backend   │
                         │      Node.js        │
                         └──────┬───────┬──────┘
                                │       │
                   ┌────────────┘       └─────────────┐
                   ↓                                  ↓
          ┌─────────────────┐                ┌─────────────────┐
          │   PostgreSQL    │                │    AI Service   │
          │    Database     │                │  OpenAI API     │
          └─────────────────┘                └─────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

* React
* Vite
* React Router
* Axios
* React Icons
* Framer Motion
* React Hot Toast
* React Helmet Async
* CSS

## Backend

* Node.js
* Express.js
* PostgreSQL
* `pg`
* JWT
* bcryptjs
* Multer
* Helmet
* CORS
* Express Rate Limit
* dotenv

## Database

* PostgreSQL

## AI

* OpenAI API
* Portfolio database context
* AI fallback mode

## Deployment

* GitHub
* Vercel
* Render
* PostgreSQL

---

# 📁 Project Structure

```text
yohannes-alemayehu-portfolio/
│
├── backend/
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── achievementController.js
│   │   │   ├── authController.js
│   │   │   ├── certificateController.js
│   │   │   ├── chatbotController.js
│   │   │   ├── contactController.js
│   │   │   ├── dashboardController.js
│   │   │   ├── educationController.js
│   │   │   ├── experienceController.js
│   │   │   ├── messageController.js
│   │   │   ├── projectController.js
│   │   │   ├── settingController.js
│   │   │   ├── skillController.js
│   │   │   └── socialController.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorMiddleware.js
│   │   │   ├── rateLimitMiddleware.js
│   │   │   ├── roleMiddleware.js
│   │   │   └── validateIdMiddleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── achievementModel.js
│   │   │   ├── certificateModel.js
│   │   │   ├── chatbotModel.js
│   │   │   ├── dashboardModel.js
│   │   │   ├── educationModel.js
│   │   │   ├── experienceModel.js
│   │   │   ├── messageModel.js
│   │   │   ├── projectModel.js
│   │   │   ├── settingModel.js
│   │   │   ├── skillModel.js
│   │   │   ├── socialModel.js
│   │   │   └── userModel.js
│   │   │
│   │   ├── routes/
│   │   │   ├── achievementRoutes.js
│   │   │   ├── authRoutes.js
│   │   │   ├── certificateRoutes.js
│   │   │   ├── chatbotRoutes.js
│   │   │   ├── contactRoutes.js
│   │   │   ├── dashboardRoutes.js
│   │   │   ├── educationRoutes.js
│   │   │   ├── experienceRoutes.js
│   │   │   ├── messageRoutes.js
│   │   │   ├── projectRoutes.js
│   │   │   ├── settingRoutes.js
│   │   │   ├── skillRoutes.js
│   │   │   └── socialRoutes.js
│   │   │
│   │   ├── services/
│   │   │   ├── aiService.js
│   │   │   └── chatbotService.js
│   │   │
│   │   ├── utils/
│   │   │   └── validation.js
│   │   │
│   │   └── server.js
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── frontend/
│   │
│   ├── public/
│   │   ├── favicon.svg
│   │   ├── og-image.svg
│   │   ├── resume.pdf
│   │   ├── robots.txt
│   │   ├── sitemap.xml
│   │   └── Yohannes.jpg
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── chatbot/
│   │   │   ├── About.jsx
│   │   │   ├── Achievements.jsx
│   │   │   ├── Certificates.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Experience.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── SEO.jsx
│   │   │   └── Skills.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── SettingsContext.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   │
│   │   ├── layouts/
│   │   │   ├── AdminLayout.jsx
│   │   │   └── PublicLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminProjects.jsx
│   │   │   ├── AdminSkills.jsx
│   │   │   ├── AdminExperience.jsx
│   │   │   ├── AdminEducation.jsx
│   │   │   ├── AdminAchievements.jsx
│   │   │   ├── AdminCertificates.jsx
│   │   │   ├── AdminMessages.jsx
│   │   │   ├── AdminSettings.jsx
│   │   │   ├── AdminSocialLinks.jsx
│   │   │   ├── ProjectDetails.jsx
│   │   │   └── Resume.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── projectService.js
│   │   │   ├── skillService.js
│   │   │   ├── experienceService.js
│   │   │   ├── educationService.js
│   │   │   ├── achievementService.js
│   │   │   ├── certificateService.js
│   │   │   ├── messageService.js
│   │   │   ├── settingService.js
│   │   │   ├── socialService.js
│   │   │   ├── dashboardService.js
│   │   │   └── chatbotService.js
│   │   │
│   │   ├── utils/
│   │   │   └── errorHandler.js
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── vercel.json
│
├── .gitignore
├── README.md
└── package configuration
```

---

# 🗄️ Database Design

The application uses PostgreSQL.

The database contains the following main tables:

```text
users
projects
project_technologies
skills
experience
education
achievements
certificates
messages
social_links
site_settings
```

### Relationship Overview

```text
                    users
                      │
                      │ authentication
                      ↓
                Admin Dashboard
                      │
       ┌──────────────┼───────────────┐
       ↓              ↓               ↓
   projects        skills        experience
       │
       ↓
project_technologies

       ┌──────────────┬───────────────┐
       ↓              ↓               ↓
  education     achievements     certificates

                      │
                      ↓
                site_settings

Visitors
   │
   ↓
Contact Form
   │
   ↓
messages
```

---

# 📊 Main Database Tables

## Users

Stores administrator accounts.

```text
id
name
email
password_hash
role
created_at
updated_at
```

---

## Projects

Stores portfolio projects.

```text
id
title
slug
short_description
description
problem
solution
challenges
image_url
github_url
live_url
category
featured
project_date
created_at
updated_at
```

---

## Skills

Stores technical skills.

```text
id
name
category
icon
description
display_order
created_at
updated_at
```

---

## Experience

Stores professional experience.

```text
id
company
position
description
start_date
end_date
current_position
location
created_at
updated_at
```

---

## Education

Stores educational background.

```text
id
institution
degree
department
description
start_date
end_date
current_education
created_at
updated_at
```

---

## Achievements

Stores achievements and awards.

---

## Certificates

Stores professional certificates.

---

## Messages

Stores messages submitted through the contact form.

---

## Social Links

Stores social media and professional links.

---

## Site Settings

Stores configurable website settings.

---

# 🔐 Authentication

Admin authentication uses JWT.

The authentication flow is:

```text
Admin
  │
  ↓
Login Form
  │
  ↓
POST /api/auth/login
  │
  ↓
Express Controller
  │
  ↓
Find User
  │
  ↓
bcrypt Password Verification
  │
  ↓
Generate JWT
  │
  ↓
Return Token
  │
  ↓
Frontend localStorage
  │
  ↓
Protected Requests
  │
  ↓
Authorization: Bearer TOKEN
```

Passwords are never stored as plain text.

They are stored as bcrypt hashes.

---

# 🛡️ Security

The application implements several security practices.

## Password Security

Passwords are hashed using:

```text
bcryptjs
```

---

## JWT Authentication

Protected administrative endpoints require:

```http
Authorization: Bearer <JWT>
```

---

## Role-Based Authorization

Administrative operations require an authorized admin role.

---

## Parameterized SQL

Database queries use parameterized queries to reduce SQL injection risks.

Example:

```javascript
const result = await pool.query(
    "SELECT * FROM projects WHERE id = $1",
    [id]
);
```

---

## CORS

The backend restricts frontend access using the configured client URL.

---

## Helmet

HTTP security headers are configured using:

```text
helmet
```

---

## Rate Limiting

Rate limiting is applied to reduce abuse.

Examples include:

* Login requests
* Contact requests
* Chatbot requests
* General API requests

---

## Environment Variables

Sensitive values are stored in environment variables.

Never commit:

```text
.env
```

to GitHub.

---

# 🤖 Chatbot Architecture

The chatbot follows this flow:

```text
Visitor
   │
   ↓
React Chatbot
   │
   ↓
POST /api/chatbot/message
   │
   ↓
Rate Limiter
   │
   ↓
Chatbot Controller
   │
   ↓
Chatbot Service
   │
   ├───────────────┐
   ↓               ↓
PostgreSQL      AI Service
   │               │
   │               ↓
   │          OpenAI API
   │
   └───────┬───────┘
           ↓
      AI Response
           │
           ↓
      React Chatbot
```

The chatbot can also operate in fallback mode when AI is disabled or unavailable.

---

# 🌐 API Structure

The backend provides RESTful endpoints.

Base URL:

```text
/api
```

---

## Authentication

```text
POST /api/auth/login
GET  /api/auth/me
```

---

## Projects

```text
GET    /api/projects
GET    /api/projects/:id
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id
```

---

## Skills

```text
GET    /api/skills
POST   /api/skills
PUT    /api/skills/:id
DELETE /api/skills/:id
```

---

## Experience

```text
GET    /api/experience
POST   /api/experience
PUT    /api/experience/:id
DELETE /api/experience/:id
```

---

## Education

```text
GET    /api/education
POST   /api/education
PUT    /api/education/:id
DELETE /api/education/:id
```

---

## Achievements

```text
GET    /api/achievements
POST   /api/achievements
PUT    /api/achievements/:id
DELETE /api/achievements/:id
```

---

## Certificates

```text
GET    /api/certificates
POST   /api/certificates
PUT    /api/certificates/:id
DELETE /api/certificates/:id
```

---

## Social Links

```text
GET    /api/social-links
POST   /api/social-links
PUT    /api/social-links/:id
DELETE /api/social-links/:id
```

---

## Settings

```text
GET    /api/settings
PUT    /api/settings/:key
```

---

## Messages

```text
POST   /api/contact
GET    /api/messages
PUT    /api/messages/:id
DELETE /api/messages/:id
```

---

## Dashboard

```text
GET /api/dashboard
```

---

## Chatbot

```text
POST /api/chatbot/message
```

The chatbot endpoint is public and does not require an admin JWT.

---

# 💻 Local Development

## Requirements

Install the following before running the project:

* Node.js
* npm
* PostgreSQL
* Git

---

# 📥 Clone the Repository

```bash
git clone https://github.com/yohannesalemayehu1012/yohannes-alemayehu-portfolio.git
```

Enter the project:

```bash
cd yohannes-alemayehu-portfolio
```

---

# ⚙️ Backend Setup

Move into the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create:

```text
backend/.env
```

Use:

```env
PORT=5000
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_strong_jwt_secret
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=your_openai_model
CHATBOT_AI_ENABLED=true
CLIENT_URL=http://localhost:5173
```

Never commit this file.

---

# 🗄️ Database Setup

Create a PostgreSQL database.

For example:

```sql
CREATE DATABASE yohannes_portfolio;
```

Run the database schema:

```bash
psql -U postgres -d yohannes_portfolio -f database/schema.sql
```

Then seed the database:

```bash
psql -U postgres -d yohannes_portfolio -f database/seed.sql
```

Alternatively, execute the SQL files using pgAdmin.

---

# ▶️ Start the Backend

From:

```text
backend/
```

run:

```bash
npm start
```

The backend should run on:

```text
http://localhost:5000
```

Test it:

```text
http://localhost:5000
```

Expected response:

```json
{
  "success": true,
  "message": "Yohannes Portfolio API is running 🚀"
}
```

---

# 🎨 Frontend Setup

Open another terminal.

Move into:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SITE_URL=http://localhost:5173
```

---

# ▶️ Start the Frontend

Run:

```bash
npm run dev
```

The frontend should be available at:

```text
http://localhost:5173
```

---

# 🔑 Admin Dashboard

Local admin login:

```text
http://localhost:5173/admin/login
```

After successful authentication:

```text
http://localhost:5173/admin/dashboard
```

The admin dashboard is protected using authentication and authorization.

---

# 🧪 Production Build

Before deployment, build the frontend:

```bash
cd frontend
npm run build
```

The production files will be generated inside:

```text
frontend/dist/
```

You can preview the production build with:

```bash
npm run preview
```

---

# 🚀 Deployment

The project uses separate deployment services.

```text
GitHub
   │
   ├───────────────┐
   ↓               ↓
Vercel           Render
   │               │
React             Express
Frontend          Backend
                   │
             ┌─────┴─────┐
             ↓           ↓
        PostgreSQL    OpenAI API
```

---

# ☁️ Frontend Deployment — Vercel

The React application is deployed to Vercel.

Configuration:

```text
Framework:
Vite

Root Directory:
frontend

Build Command:
npm run build

Output Directory:
dist
```

Production environment variable:

```env
VITE_API_URL=https://YOUR-RENDER-BACKEND-URL/api
```

The frontend must never contain backend secrets such as:

```text
DATABASE_URL
JWT_SECRET
OPENAI_API_KEY
```

---

# ☁️ Backend Deployment — Render

The Express backend is deployed as a Render Web Service.

Configuration:

```text
Root Directory:
backend

Runtime:
Node

Build Command:
npm install

Start Command:
npm start
```

Backend environment variables:

```env
DATABASE_URL=your_render_internal_database_url
JWT_SECRET=your_production_jwt_secret
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=your_openai_model
CHATBOT_AI_ENABLED=true
CLIENT_URL=https://YOUR-VERCEL-DOMAIN
```

---

# 🐘 Production PostgreSQL

The production database is hosted separately from the frontend.

The backend connects to PostgreSQL through:

```env
DATABASE_URL
```

The production database contains:

```text
achievements
certificates
education
experience
messages
project_technologies
projects
site_settings
skills
social_links
users
```

---

# 🔄 Production Request Flow

When a visitor opens the portfolio:

```text
Browser
   │
   ↓
Vercel
   │
   ↓
React Application
   │
   ↓
Axios
   │
   ↓
Render Backend
   │
   ↓
Express Route
   │
   ↓
Controller
   │
   ↓
Model / PostgreSQL
   │
   ↓
JSON Response
   │
   ↓
React UI
```

---

# 📱 Responsive Design

The portfolio is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

The chatbot also adapts to smaller screens.

---

# 🔎 SEO

The application includes SEO-related features such as:

* Page titles
* Meta descriptions
* Canonical URLs
* Open Graph metadata
* Twitter metadata
* Structured data
* Robots configuration
* Sitemap
* Favicon

Administrative pages should not be indexed by search engines.

---

# ⚡ Performance

Performance considerations include:

* React lazy loading
* Route-based code splitting
* Optimized images
* Lazy loading for appropriate images
* PostgreSQL indexes
* Connection pooling
* API request timeout
* Production Vite builds

---

# 📬 Contact System

Visitors can submit messages through the contact form.

```text
Visitor
   ↓
Contact Form
   ↓
POST /api/contact
   ↓
Validation
   ↓
PostgreSQL
   ↓
messages table
   ↓
Admin Dashboard
```

Administrators can view and manage submitted messages.

---

# 🧪 Testing Checklist

Before considering the application production-ready, test:

## Frontend

* [ ] Home page
* [ ] Navigation
* [ ] About
* [ ] Skills
* [ ] Projects
* [ ] Project details
* [ ] Experience
* [ ] Education
* [ ] Achievements
* [ ] Certificates
* [ ] Resume
* [ ] Contact
* [ ] Social links
* [ ] Responsive design
* [ ] Chatbot

## Authentication

* [ ] Admin login
* [ ] Invalid credentials
* [ ] Protected routes
* [ ] JWT expiration
* [ ] Logout
* [ ] Unauthorized API requests

## Admin Dashboard

* [ ] Dashboard statistics
* [ ] Create project
* [ ] Edit project
* [ ] Delete project
* [ ] Manage skills
* [ ] Manage experience
* [ ] Manage education
* [ ] Manage achievements
* [ ] Manage certificates
* [ ] Manage social links
* [ ] Manage settings
* [ ] View messages

## Backend

* [ ] API health check
* [ ] Database connection
* [ ] CRUD endpoints
* [ ] Validation
* [ ] Error handling
* [ ] CORS
* [ ] Rate limiting

## AI Chatbot

* [ ] Normal question
* [ ] Portfolio question
* [ ] Unknown question
* [ ] Long message
* [ ] Empty message
* [ ] Rate limit
* [ ] AI unavailable fallback

---

# 🔒 Environment Variables

## Backend

```env
PORT=
DATABASE_URL=
JWT_SECRET=
OPENAI_API_KEY=
OPENAI_MODEL=
CHATBOT_AI_ENABLED=
CLIENT_URL=
```

## Frontend

```env
VITE_API_URL=
VITE_SITE_URL=
```

### Security Rule

Frontend environment variables beginning with:

```text
VITE_
```

are exposed to the browser.

Therefore, never place private credentials in them.

---

# 📝 Git Workflow

Check project status:

```bash
git status
```

Add changes:

```bash
git add .
```

Commit:

```bash
git commit -m "Update portfolio"
```

Push:

```bash
git push origin main
```

Vercel and Render can automatically deploy new commits when automatic deployment is enabled.

---

# 🌿 Git Branch

The main production branch is:

```text
main
```

---

# 📦 Important Files

| File                                         | Purpose                            |
| -------------------------------------------- | ---------------------------------- |
| `backend/src/server.js`                      | Express server entry point         |
| `backend/src/config/database.js`             | PostgreSQL connection              |
| `backend/src/controllers/`                   | Business logic                     |
| `backend/src/routes/`                        | API routes                         |
| `backend/src/middleware/`                    | Authentication/security middleware |
| `backend/src/services/`                      | AI and application services        |
| `frontend/src/App.jsx`                       | React application routes           |
| `frontend/src/services/api.js`               | Axios API configuration            |
| `frontend/src/context/AuthContext.jsx`       | Authentication state               |
| `frontend/src/components/ProtectedRoute.jsx` | Admin route protection             |
| `frontend/vercel.json`                       | Vercel SPA routing                 |
| `database/schema.sql`                        | Database structure                 |
| `database/seed.sql`                          | Initial portfolio data             |

---

# 🧭 Application Routes

## Public Routes

```text
/
 /about
 /projects
 /projects/:slug
 /resume
```

## Admin Routes

```text
/admin/login
/admin/dashboard
/admin/projects
/admin/skills
/admin/experience
/admin/education
/admin/achievements
/admin/certificates
/admin/messages
/admin/social-links
/admin/settings
```

---

# 🏆 Featured Project

## School Management System

A full-stack platform for managing students, courses, examinations, and academic records.

### Technologies

```text
React
Node.js
Express.js
PostgreSQL
JWT
```

### Key Features

* Student management
* Academic record management
* Course management
* Examination management
* Authentication
* Authorization
* Role-based access
* Secure API architecture

---

# 🎯 Goals of This Portfolio

The portfolio was designed to demonstrate practical knowledge of:

```text
Frontend Development
        ↓
React + Vite
        ↓
REST APIs
        ↓
Node.js + Express
        ↓
PostgreSQL
        ↓
Authentication
        ↓
Security
        ↓
AI Integration
        ↓
Cloud Deployment
```

It demonstrates how a modern application can be designed, developed, secured, and deployed as a complete full-stack system.

---

# 🔮 Future Improvements

Possible future improvements include:

* Custom domain
* Analytics dashboard
* Blog system
* Project search and filtering
* Dark/light theme customization
* More advanced AI chatbot capabilities
* Automated testing
* CI/CD improvements
* Image upload management
* Email notification system
* Advanced admin analytics

---

# 📄 License

This project is a personal portfolio application.

Unless otherwise stated, the content, personal information, images, resume, and portfolio materials are owned by **Yohannes Alemayehu**.

---

# 📞 Contact

For professional opportunities, collaborations, software development projects, or technical discussions, please use the contact information provided on the portfolio website.

**Portfolio:**

https://yohannes-alemayehu-portfolio.vercel.app

---

# ⭐ Acknowledgment

This portfolio was built as a practical full-stack software engineering project with a focus on:

* Clean architecture
* Security
* Maintainability
* Responsive design
* RESTful API development
* Database design
* Authentication
* AI integration
* Cloud deployment

---

## 👨‍💻 Built by Yohannes Alemayehu

**Software Engineer | Full-Stack Developer**

React • Node.js • Express.js • PostgreSQL • JavaScript • REST API • AI/ML
