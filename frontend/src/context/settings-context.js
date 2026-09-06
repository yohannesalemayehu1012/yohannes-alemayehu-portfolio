import { createContext, useContext } from "react";

export const SettingsContext = createContext(null);

export const defaultSettings = {
  site_name: "Yohannes Alemayehu",
  professional_title: "Software Engineer",
  hero_description: "Building digital solutions for real-world problems.",
  about_description:
    "I am a Software Engineering student and full-stack developer passionate about building practical digital solutions.",
  email: "",
  phone: "",
  location: "Ethiopia",
  resume_url: "/resume.pdf",
  availability: "Available for opportunities",
  footer_text: "© 2026 Yohannes Alemayehu. All rights reserved.",
};

export const useSettings = () => useContext(SettingsContext);
