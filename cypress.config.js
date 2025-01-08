const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: 'tests/e2e/**/*.cy.js', // Cambia el patrón para buscar en tests/e2e
    baseUrl: 'http://localhost:3000',    // URL base de tu aplicación
  },
});
