// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  
});
export default defineConfig({
  reporter: [
    ['list'], // console reporter
    ['allure-playwright'] // Allure reporter
  ],
});