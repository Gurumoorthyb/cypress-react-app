describe('File Handling Tests', () => {
  beforeEach(() => {
    cy.visit('/file-handling');
  });

  it('should display file upload components', () => {
    cy.get('[data-cy="file-handling-title"]').should('be.visible');
    cy.get('[data-cy="select-files-btn"]').should('be.visible');
    cy.get('[data-cy="upload-btn"]').should('be.visible').and('be.disabled');
  });

  it('should handle file selection', () => {
    // Create a test file
    cy.get('[data-cy="file-input"]').attachFile({
      fileContent: 'Hello, World!',
      fileName: 'test.txt',
      mimeType: 'text/plain'
    });

    // Check if file is listed
    cy.get('[data-cy="file-item-0"]').should('be.visible');
    cy.get('[data-cy="file-item-0"]').should('contain', 'test.txt');
    
    // Upload button should be enabled
    cy.get('[data-cy="upload-btn"]').should('not.be.disabled');
  });

  it('should handle multiple file selection', () => {
    // Attach multiple files
    cy.get('[data-cy="file-input"]').attachFile([
      {
        fileContent: 'File 1 content',
        fileName: 'file1.txt',
        mimeType: 'text/plain'
      },
      {
        fileContent: 'File 2 content',
        fileName: 'file2.txt',
        mimeType: 'text/plain'
      }
    ]);

    // Check if both files are listed
    cy.get('[data-cy="file-item-0"]').should('contain', 'file1.txt');
    cy.get('[data-cy="file-item-1"]').should('contain', 'file2.txt');
  });

  it('should handle file upload process', () => {
    // Attach a file
    cy.get('[data-cy="file-input"]').attachFile({
      fileContent: 'Test content',
      fileName: 'upload-test.txt',
      mimeType: 'text/plain'
    });

    // Start upload
    cy.get('[data-cy="upload-btn"]').click();

    // Check progress bar appears
    cy.get('[data-cy="upload-progress"]').should('be.visible');

    // Wait for upload to complete and check success message
    cy.get('[data-cy="file-message"]')
      .should('be.visible')
      .and('contain', 'Files uploaded successfully!');
  });

  it('should handle file deletion', () => {
    // Attach a file
    cy.get('[data-cy="file-input"]').attachFile({
      fileContent: 'Delete test',
      fileName: 'delete-test.txt',
      mimeType: 'text/plain'
    });

    // Check file is listed
    cy.get('[data-cy="file-item-0"]').should('be.visible');

    // Delete file
    cy.get('[data-cy="delete-btn-0"]').click();

    // Verify file is removed
    cy.get('[data-cy="file-item-0"]').should('not.exist');
  });

  it('should handle sample file download', () => {
    // Click download button for sample file
    cy.get('[data-cy="download-sample-btn"]').click();

    // Note: Actual file download verification is limited in Cypress
    // You might want to use cy.readFile() to verify the downloaded file
    // if it's saved to a known location
  });

  it('should show error when trying to upload without selecting files', () => {
    cy.get('[data-cy="upload-btn"]').should('be.disabled');
    
    // Force click (if we want to test the error case)
    cy.get('[data-cy="upload-btn"]').click({ force: true });
    
    cy.get('[data-cy="file-message"]')
      .should('be.visible')
      .and('contain', 'Please select files to upload');
  });
}); 