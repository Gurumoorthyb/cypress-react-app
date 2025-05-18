const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://gurumoorthyb.github.io/cypress-react-app',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Adding this option to help debug routing issues
    retries: {
      runMode: 2,
      openMode: 0
    }
  },
});
