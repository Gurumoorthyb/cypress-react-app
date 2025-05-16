describe('Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should navigate to all pages through the navigation bar', () => {
    // Check if we're on the home page
    cy.get('[data-cy="home-title"]').should('contain', 'Cypress Testing Playground');

    // Test navigation to Forms page
    cy.get('[data-cy="nav-forms"]').click();
    cy.get('[data-cy="forms-title"]').should('contain', 'Form Testing');

    // Test navigation to Tables page
    cy.get('[data-cy="nav-tables"]').click();
    cy.get('[data-cy="tables-title"]').should('contain', 'Table Testing');

    // Test navigation to Drag & Drop page
    cy.get('[data-cy="nav-dragdrop"]').click();
    cy.get('[data-cy="dragdrop-title"]').should('contain', 'Drag and Drop Testing');

    // Test navigation to Files page
    cy.get('[data-cy="nav-files"]').click();
    cy.get('[data-cy="file-handling-title"]').should('contain', 'File Handling Testing');

    // Test navigation to API page
    cy.get('[data-cy="nav-api"]').click();
    cy.get('[data-cy="api-tests-title"]').should('contain', 'API Testing');

    // Test navigation to iFrame page
    cy.get('[data-cy="nav-iframe"]').click();
    cy.get('[data-cy="iframe-title"]').should('contain', 'iFrame Testing');

    // Test navigation back to home
    cy.get('[data-cy="nav-home"]').click();
    cy.get('[data-cy="home-title"]').should('contain', 'Cypress Testing Playground');
  });

  it('should display all feature cards on home page', () => {
    cy.get('[data-cy="feature-card-0"]').should('exist');
    cy.get('[data-cy="feature-card-1"]').should('exist');
    cy.get('[data-cy="feature-card-2"]').should('exist');
    cy.get('[data-cy="feature-card-3"]').should('exist');
    cy.get('[data-cy="feature-card-4"]').should('exist');
    cy.get('[data-cy="feature-card-5"]').should('exist');
  });
}); 