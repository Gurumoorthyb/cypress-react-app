describe('iFrame Tests', () => {
  beforeEach(() => {
    cy.visit('/iframe-test', { failOnStatusCode: false });
  });

  it('should display iframe components', () => {
    cy.get('[data-cy="iframe-title"]').should('be.visible');
    cy.get('[data-cy="message-input"]').should('be.visible');
    cy.get('[data-cy="send-message-btn"]').should('be.visible');
    cy.get('[data-cy="test-iframe"]').should('be.visible');
  });

  it('should send message to iframe', () => {
    const testMessage = 'Hello iframe!';
    
    // Type message
    cy.get('[data-cy="message-input"]').type(testMessage);
    
    // Send message
    cy.get('[data-cy="send-message-btn"]').click();
    
    // Switch to iframe context and verify message
    cy.get('[data-cy="test-iframe"]').then($iframe => {
      const $body = $iframe.contents().find('body');
      cy.wrap($body)
        .find('#messageBox')
        .should('contain', testMessage);
    });
  });

  it('should receive message from iframe', () => {
    const testMessage = 'Message from iframe';
    
    // Switch to iframe context and send message
    cy.get('[data-cy="test-iframe"]').then($iframe => {
      const $body = $iframe.contents().find('body');
      cy.wrap($body)
        .find('#messageInput')
        .type(testMessage);
      
      cy.wrap($body)
        .find('[data-cy="iframe-send-btn"]')
        .click();
    });
    
    // Verify message received in parent
    cy.get('[data-cy="received-message"]')
      .should('be.visible')
      .and('contain', testMessage);
  });

  it('should handle iframe loading errors', () => {
    // Test external iframe loading
    cy.get('[data-cy="external-iframe"]').should('be.visible');
    
    // Note: Due to same-origin policy, we can't directly test the content
    // of the external iframe, but we can verify it loads
  });

  it('should handle bidirectional communication', () => {
    const parentMessage = 'Parent to iframe';
    const iframeMessage = 'Iframe to parent';
    
    // Send message from parent to iframe
    cy.get('[data-cy="message-input"]').type(parentMessage);
    cy.get('[data-cy="send-message-btn"]').click();
    
    // Verify message in iframe
    cy.get('[data-cy="test-iframe"]').then($iframe => {
      const $body = $iframe.contents().find('body');
      cy.wrap($body)
        .find('#messageBox')
        .should('contain', parentMessage);
      
      // Send message back from iframe
      cy.wrap($body)
        .find('#messageInput')
        .type(iframeMessage);
      
      cy.wrap($body)
        .find('[data-cy="iframe-send-btn"]')
        .click();
    });
    
    // Verify message in parent
    cy.get('[data-cy="received-message"]')
      .should('be.visible')
      .and('contain', iframeMessage);
  });

  // Note: Some iframe interactions might be limited due to same-origin policy
  // and Cypress security restrictions. You might need to mock certain behaviors
  // or use alternative testing strategies for cross-origin iframes.
}); 