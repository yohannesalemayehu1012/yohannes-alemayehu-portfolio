import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

import AdminLayout from "./layouts/AdminLayout";

import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Achievements from "./components/Achievements";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import Chatbot from "./components/chatbot/Chatbot";
const AdminProjects = lazy(() => import("./pages/AdminProjects"));
const AdminProjectForm = lazy(() => import("./pages/AdminProjectForm"));
const AdminSkills = lazy(() => import("./pages/AdminSkills"));
const AdminExperience = lazy(() => import("./pages/AdminExperience"));
const AdminEducation = lazy(() => import("./pages/AdminEducation"));
const AdminAchievements = lazy(() => import("./pages/AdminAchievements"));
const AdminCertificates = lazy(() => import("./pages/AdminCertificates"));
const AdminMessages = lazy(() => import("./pages/AdminMessages"));
const AdminSocialLinks = lazy(() => import("./pages/AdminSocialLinks"));
const AdminSettings = lazy(() => import("./pages/AdminSettings"));
const Resume = lazy(() => import("./pages/Resume"));

const PageLoading = () => (
  <div className="page-loading">
    <p>Loading...</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
        }}
      />

      <Suspense fallback={<PageLoading />}>
        <Routes>
          {/* PUBLIC WEBSITE */}

          <Route
            path="/"
            element={
              <>
                <Navbar />

                <main>
                  <Home />
                  <About />
                  <Skills />
                  <Projects />
                  <Experience />
                  <Education />
                  <Achievements />
                  <Certificates />
                  <Contact />
                </main>

                <Footer />
                <Chatbot />
              </>
            }
          />

          {/* PROJECT DETAILS */}

          <Route
            path="/projects/:slug"
            element={
              <>
                <Navbar />
                <ProjectDetails />
                <Chatbot />
              </>
            }
          />

          <Route
            path="/resume"
            element={
              <>
                <Resume />
                <Chatbot />
              </>
            }
          />

          {/* ADMIN LOGIN */}

          <Route path="/admin/login" element={<AdminLogin />} />

          {/* PROTECTED ADMIN */}

          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />

              <Route path="projects" element={<AdminProjects />} />

              <Route path="projects/new" element={<AdminProjectForm />} />

              <Route path="projects/edit/:id" element={<AdminProjectForm />} />
              <Route path="skills" element={<AdminSkills />} />
              <Route path="experience" element={<AdminExperience />} />
              <Route path="education" element={<AdminEducation />} />
              <Route path="achievements" element={<AdminAchievements />} />
              <Route path="certificates" element={<AdminCertificates />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="social-links" element={<AdminSocialLinks />} />

              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
