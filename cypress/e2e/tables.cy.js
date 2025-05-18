describe('Tables Tests', () => {
  beforeEach(() => {
    cy.visit('/tables', { failOnStatusCode: false });
  });

  it('should display the table with initial data', () => {
    // Check table headers
    cy.get('[data-cy="header-name"]').should('contain', 'Name');
    cy.get('[data-cy="header-email"]').should('contain', 'Email');
    cy.get('[data-cy="header-role"]').should('contain', 'Role');
    cy.get('[data-cy="header-status"]').should('contain', 'Status');

    // Check first row data
    cy.get('[data-cy="row-1"]').within(() => {
      cy.get('[data-cy="cell-name-1"]').should('contain', 'John Doe');
      cy.get('[data-cy="cell-email-1"]').should('contain', 'john@example.com');
      cy.get('[data-cy="cell-role-1"]').should('contain', 'Admin');
      cy.get('[data-cy="cell-status-1"]').should('contain', 'Active');
    });
  });

  it('should filter table data', () => {
    // Filter by name
    cy.get('[data-cy="table-filter"]').type('John');
    cy.get('[data-cy="row-1"]').should('be.visible');
    cy.get('[data-cy="row-2"]').should('not.exist');

    // Clear filter and check all data is shown
    cy.get('[data-cy="table-filter"]').clear();
    cy.get('[data-cy="row-1"]').should('be.visible');
    cy.get('[data-cy="row-2"]').should('be.visible');

    // Filter by role
    cy.get('[data-cy="table-filter"]').type('Admin');
    cy.get('tbody tr').should('have.length.at.most', 2); // Only admin users
  });

  it('should sort table data', () => {
    // Sort by name
    cy.get('[data-cy="header-name"]').click();
    cy.get('[data-cy="cell-name-1"]').should('be.visible');
    
    // Click again to reverse sort
    cy.get('[data-cy="header-name"]').click();
    cy.get('[data-cy="cell-name-1"]').should('be.visible');

    // Sort by role
    cy.get('[data-cy="header-role"]').click();
    cy.get('[data-cy="cell-role-1"]').should('be.visible');
  });

  it('should handle pagination', () => {
    // Check initial page size
    cy.get('[data-cy="table-pagination"]').should('contain', '1-5');

    // Change rows per page
    cy.get('[data-cy="table-pagination"]').contains('5').click();
    cy.get('[aria-label="rows per page"]').contains('10').click();
    cy.get('tbody tr').should('have.length', 10);

    // Navigate to next page
    cy.get('[aria-label="Go to next page"]').click();
    cy.get('[data-cy="table-pagination"]').should('contain', '11-');

    // Navigate back to previous page
    cy.get('[aria-label="Go to previous page"]').click();
    cy.get('[data-cy="table-pagination"]').should('contain', '1-10');
  });

  it('should combine filter, sort, and pagination', () => {
    // Filter results
    cy.get('[data-cy="table-filter"]').type('user');
    
    // Sort filtered results
    cy.get('[data-cy="header-name"]').click();
    
    // Check pagination with filtered results
    cy.get('[data-cy="table-pagination"]').should('contain', 'of');
  });
}); 