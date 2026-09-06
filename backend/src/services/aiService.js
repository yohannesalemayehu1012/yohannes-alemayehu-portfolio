const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateAIResponse = async ({
  message,
  portfolioContext,
  conversation = [],
}) => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const systemPrompt = `
You are the AI assistant for Yohannes Alemayehu's
professional software engineering portfolio.

Your job is to help visitors understand Yohannes's:

- professional background
- technical skills
- projects
- education
- experience
- achievements
- certificates
- contact information

Use the provided portfolio information as your primary
source of truth.

IMPORTANT RULES:

1. Never invent information.
2. Never create fake projects.
3. Never create fake work experience.
4. Never create fake education.
5. Never create fake certificates.
6. Never create fake skills.
7. Never create fake achievements.
8. Never claim technologies that are not provided.
9. If information is unavailable, clearly say so.
10. Keep responses professional and reasonably concise.
11. Answer questions about Yohannes and his portfolio.
12. Do not reveal private database information.
13. Never reveal passwords, password hashes, JWT secrets,
    API keys, or other security information.
14. Do not expose internal database structure unless
  necessary for a normal visitor response.
15. Use conversation history to understand follow-up questions.
16. Resolve contextual references such as "it", "he", and "that project" from the conversation.
17. Treat portfolio information as more authoritative than assumptions.

If the visitor asks something unrelated to Yohannes's
portfolio, politely explain that you are designed primarily
to answer questions about Yohannes's professional portfolio.

PORTFOLIO INFORMATION:

${portfolioContext}
`;

  const conversationInput = conversation.map((item) => ({
    role: item.sender === "user" ? "user" : "assistant",
    content: item.text,
  }));

  conversationInput.push({
    role: "user",
    content: message,
  });

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    instructions: systemPrompt,
    input: conversationInput,
  });

  return response.output_text;
};

module.exports = {
  generateAIResponse,
};
