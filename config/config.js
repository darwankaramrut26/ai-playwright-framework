// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,

  use: {
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry'
  },

  reporter: [
    ['spec'],               // ✅ Clean console output
    ['html'],               // ✅ Playwright HTML report
    ['allure-playwright']   // ✅ Allure report
  ],
});