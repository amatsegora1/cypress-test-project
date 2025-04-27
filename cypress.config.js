const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://example.cypress.io',
    specPattern: 'cypress/e2e/**/*.cy.js',
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  reporter: 'mochawesome',
  reporterOptions: {
  reportDir: 'cypress/reports',
  overwrite: false,
  html: true,
  json: true
}
});
