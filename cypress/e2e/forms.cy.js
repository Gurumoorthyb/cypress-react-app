describe('Forms Tests', () => {
  beforeEach(() => {
    cy.visit('/forms');
  });

  it('should show validation errors for empty required fields', () => {
    // Try to submit empty form
    cy.get('[data-cy="submit-button"]').click();

    // Check for validation errors
    cy.get('[data-cy="username-input"]').should('have.class', 'Mui-error');
    cy.get('[data-cy="email-input"]').should('have.class', 'Mui-error');
    cy.get('[data-cy="password-input"]').should('have.class', 'Mui-error');
    cy.get('[data-cy="gender-group"]').parent().should('have.class', 'Mui-error');
    cy.get('[data-cy="country-select"]').parent().should('have.class', 'Mui-error');
  });

  it('should validate email format', () => {
    // Enter invalid email
    cy.get('[data-cy="email-input"]').type('invalid-email');
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="email-input"]').should('have.class', 'Mui-error');
    cy.contains('Email is invalid').should('be.visible');

    // Enter valid email
    cy.get('[data-cy="email-input"]').clear().type('valid@email.com');
    cy.get('[data-cy="email-input"]').should('not.have.class', 'Mui-error');
  });

  it('should validate password length', () => {
    // Enter short password
    cy.get('[data-cy="password-input"]').type('12345');
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="password-input"]').should('have.class', 'Mui-error');
    cy.contains('Password must be at least 6 characters').should('be.visible');

    // Enter valid password
    cy.get('[data-cy="password-input"]').clear().type('123456');
    cy.get('[data-cy="password-input"]').should('not.have.class', 'Mui-error');
  });

  it('should handle form submission successfully', () => {
    // Fill out the form
    cy.get('[data-cy="username-input"]').type('testuser');
    cy.get('[data-cy="email-input"]').type('test@example.com');
    cy.get('[data-cy="password-input"]').type('password123');
    cy.get('[data-cy="gender-male"]').click();
    cy.get('[data-cy="country-select"]').click();
    cy.get('[data-cy="country-us"]').click();
    cy.get('[data-cy="newsletter-checkbox"]').click();

    // Submit form
    cy.get('[data-cy="submit-button"]').click();

    // Check success message
    cy.get('[data-cy="success-message"]').should('be.visible');
    cy.get('[data-cy="success-message"]').should('contain', 'Form submitted successfully!');

    // Check form reset
    cy.get('[data-cy="username-input"]').should('have.value', '');
    cy.get('[data-cy="email-input"]').should('have.value', '');
    cy.get('[data-cy="password-input"]').should('have.value', '');
    cy.get('[data-cy="gender-group"]').should('have.value', '');
    cy.get('[data-cy="country-select"]').should('have.value', '');
    cy.get('[data-cy="newsletter-checkbox"]').should('not.be.checked');
  });

  it('should handle all gender options', () => {
    cy.get('[data-cy="gender-female"]').click().should('be.checked');
    cy.get('[data-cy="gender-male"]').click().should('be.checked');
    cy.get('[data-cy="gender-other"]').click().should('be.checked');
  });

  it('should handle country selection', () => {
    cy.get('[data-cy="country-select"]').click();
    cy.get('[data-cy="country-us"]').click();
    cy.get('[data-cy="country-select"]').should('have.value', 'us');
    
    cy.get('[data-cy="country-select"]').click();
    cy.get('[data-cy="country-uk"]').click();
    cy.get('[data-cy="country-select"]').should('have.value', 'uk');
    
    cy.get('[data-cy="country-select"]').click();
    cy.get('[data-cy="country-ca"]').click();
    cy.get('[data-cy="country-select"]').should('have.value', 'ca');
  });
}); 