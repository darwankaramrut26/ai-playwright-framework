require('dotenv').config();
const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateTestCases(userStory) {
  try {
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
  } catch (error) {
    console.warn('OpenAI API error:', error.message);
    return `Mock test cases for: ${userStory}\n1. Test valid input\n2. Test invalid input\n3. Test edge cases`;
  }
}

async function analyzeFailure(errorMessage) {
  try {
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
  } catch (error) {
    console.warn('OpenAI API error:', error.message);
    return `Mock analysis: The error "${errorMessage}" suggests checking element selectors or page load issues.`;
  }
}

module.exports = { generateTestCases, analyzeFailure };