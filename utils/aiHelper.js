require('dotenv').config();
const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateTestCases(userStory) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Generate detailed test cases for: ${userStory}`
      }
    ],
  });

  return response.choices[0].message.content;
}

async function analyzeFailure(errorMessage) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Analyze this automation failure and suggest fix: ${errorMessage}`
      }
    ],
  });

  return response.choices[0].message.content;
}

module.exports = { generateTestCases, analyzeFailure };