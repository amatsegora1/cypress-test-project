const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://example.cypress.io',
    supportFile: false,
    specPattern: 'cypress/e2e/**/*.cy.js',
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
