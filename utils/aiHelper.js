require('dotenv').config();
const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function getMockTestCases(userStory) {
  return `Mock test cases for: ${userStory}\n1. Test valid input\n2. Test invalid input\n3. Test edge cases`;
}

function getMockAnalysis(errorMessage) {
  return `Mock analysis: The error "${errorMessage}" suggests checking element selectors or page load issues.`;
}

async function generateTestCases(userStory) {
  if (!process.env.OPENAI_API_KEY) {
    console.warn('OpenAI API key missing; using mock test cases.');
    return getMockTestCases(userStory);
  }

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Generate detailed test cases for: ${userStory}`
        }
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.warn('OpenAI API error:', error.message);
    return getMockTestCases(userStory);
  }
}

async function analyzeFailure(errorMessage) {
  if (!process.env.OPENAI_API_KEY) {
    console.warn('OpenAI API key missing; using mock analysis.');
    return getMockAnalysis(errorMessage);
  }

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Analyze this automation failure and suggest fix: ${errorMessage}`
        }
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.warn('OpenAI API error:', error.message);
    return getMockAnalysis(errorMessage);
  }
}

module.exports = { generateTestCases, analyzeFailure };