const { getPortfolioContext } = require("../models/chatbotModel");

const { generateAIResponse } = require("./aiService");

const buildPortfolioContext = (portfolio) => {
  const sections = [];

  sections.push(`
PERSONAL INFORMATION

${portfolio.settings
  .map((item) => `${item.setting_key}: ${item.setting_value || ""}`)
  .join("\n")}
`);

  sections.push(`
SKILLS

${portfolio.skills
  .map(
    (skill) =>
      `- ${skill.name}
  Category: ${skill.category || "N/A"}
  Description: ${skill.description || "N/A"}`,
  )
  .join("\n")}
`);

  sections.push(`
PROJECTS

${portfolio.projects
  .map(
    (project) =>
      `- ${project.title}
  Category: ${project.category || "N/A"}
  Description: ${project.short_description || ""}
  Details: ${project.description || ""}
  Problem: ${project.problem || ""}
  Solution: ${project.solution || ""}
  Challenges: ${project.challenges || ""}
  Technologies: ${Array.isArray(project.technologies) ? project.technologies.join(", ") : ""}
  GitHub: ${project.github_url || "N/A"}
  Live Demo: ${project.live_url || "N/A"}`,
  )
  .join("\n")}
`);

  sections.push(`
EXPERIENCE

${portfolio.experience
  .map(
    (item) =>
      `- ${item.position} at ${item.company}
  Location: ${item.location || "N/A"}
  Description: ${item.description || ""}
  Start: ${item.start_date || "N/A"}
  End: ${item.current_position ? "Present" : item.end_date || "N/A"}`,
  )
  .join("\n")}
`);

  sections.push(`
EDUCATION

${portfolio.education
  .map(
    (item) =>
      `- ${item.degree}
  Institution: ${item.institution}
  Department: ${item.department || "N/A"}
  Description: ${item.description || ""}
  Start: ${item.start_date || "N/A"}
  End: ${item.current_education ? "Present" : item.end_date || "N/A"}`,
  )
  .join("\n")}
`);

  sections.push(`
ACHIEVEMENTS

${portfolio.achievements
  .map(
    (item) =>
      `- ${item.title}
  Description: ${item.description || ""}
  Date: ${item.achievement_date || "N/A"}
  Link: ${item.link_url || "N/A"}`,
  )
  .join("\n")}
`);

  sections.push(`
CERTIFICATES

${portfolio.certificates
  .map(
    (item) =>
      `- ${item.title}
  Issuer: ${item.issuer}
  Description: ${item.description || ""}
  Issue Date: ${item.issue_date || "N/A"}
  Credential ID: ${item.credential_id || "N/A"}
  Credential URL: ${item.credential_url || "N/A"}`,
  )
  .join("\n")}
`);

  sections.push(`
SOCIAL LINKS

${portfolio.socialLinks
  .map((item) => `- ${item.platform}: ${item.url}`)
  .join("\n")}
`);

  return sections.join("\n");
};

const generateFallbackResponse = (message, portfolio) => {
  const text = message.toLowerCase();

  if (
    text.includes("skill") ||
    text.includes("technology") ||
    text.includes("technologies")
  ) {
    const skills = portfolio.skills
      .map((skill) => skill.name)
      .filter(Boolean)
      .join(", ");

    return skills
      ? `Yohannes's skills include ${skills}.`
      : "Skill information is not currently available in the portfolio.";
  }

  if (text.includes("project") || text.includes("built")) {
    const projects = portfolio.projects
      .map((project) => project.title)
      .filter(Boolean)
      .join(", ");

    return projects
      ? `Yohannes has worked on projects including ${projects}.`
      : "Project information is not currently available in the portfolio.";
  }

  if (
    text.includes("education") ||
    text.includes("university") ||
    text.includes("study")
  ) {
    const education = portfolio.education
      .map((item) => `${item.degree} at ${item.institution}`)
      .filter(Boolean)
      .join("; ");

    return education
      ? `Education information: ${education}.`
      : "Education information is not currently available in the portfolio.";
  }

  if (
    text.includes("experience") ||
    text.includes("work") ||
    text.includes("career")
  ) {
    const experience = portfolio.experience
      .map((item) => `${item.position} at ${item.company}`)
      .filter(Boolean)
      .join("; ");

    return experience
      ? `Yohannes's experience includes ${experience}.`
      : "Experience information is not currently available in the portfolio.";
  }

  if (text.includes("certificate") || text.includes("certification")) {
    const certificates = portfolio.certificates
      .map((item) => item.title)
      .filter(Boolean)
      .join(", ");

    return certificates
      ? `Yohannes has certificates including ${certificates}.`
      : "Certificate information is not currently available in the portfolio.";
  }

  if (
    text.includes("contact") ||
    text.includes("email") ||
    text.includes("reach")
  ) {
    const emailSetting = portfolio.settings.find(
      (item) => item.setting_key === "email",
    );

    return emailSetting?.setting_value
      ? `You can contact Yohannes at ${emailSetting.setting_value}.`
      : "Contact information is not currently available in the portfolio.";
  }

  return "I'm the AI assistant for Yohannes Alemayehu's professional portfolio. I can help you learn about his skills, projects, education, experience, certificates, achievements, and contact information.";
};

const generateChatbotResponse = async (message, conversation = []) => {
  const portfolio = await getPortfolioContext();
  const aiEnabled = process.env.CHATBOT_AI_ENABLED === "true";

  if (!aiEnabled) {
    return generateFallbackResponse(message, portfolio);
  }

  try {
    const response = await generateAIResponse({
      message,
      portfolioContext: buildPortfolioContext(portfolio),
      conversation,
    });

    return response?.trim() || generateFallbackResponse(message, portfolio);
  } catch (error) {
    console.error("AI service failed:", error.message);
    return generateFallbackResponse(message, portfolio);
  }
};

module.exports = {
  generateChatbotResponse,
};
