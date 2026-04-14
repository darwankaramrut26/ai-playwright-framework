const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { generateTestCases, analyzeFailure } = require('../utils/aiHelper');

test('Valid Login Test', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory/);
});

test('AI Generated Test Cases Demo', async () => {
  const cases = await generateTestCases("Login functionality with valid and invalid inputs");
  console.log("\nAI Generated Test Cases:\n", cases);
});

test('Failure Analysis Demo', async ({ page }) => {
  try {
    await page.goto('https://www.saucedemo.com/');
    await page.click('#wrong-id'); // intentional failure
  } catch (error) {
    const analysis = await analyzeFailure(error.message);
    console.log("\nAI Failure Analysis:\n", analysis);
  }
});