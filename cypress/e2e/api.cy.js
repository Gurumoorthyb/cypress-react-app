describe('API Tests', () => {
  beforeEach(() => {
    cy.visit('/api-tests');

    // Intercept API calls
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts*').as('getPosts');

    cy.intercept('POST', 'https://jsonplaceholder.typicode.com/posts').as('createPost');

    cy.intercept('DELETE', 'https://jsonplaceholder.typicode.com/posts/*').as('deletePost');
  });

  it('should load initial posts', () => {
    // Check loading state
    cy.get('[data-cy="loading-indicator"]').should('be.visible');

    // Wait for API response
    cy.wait('@getPosts');

    // Check if posts are displayed
    cy.get('[data-cy="posts-list"]').should('be.visible');
    cy.get('[data-cy="post-item-1"]').should('exist');
  });

  it('should create a new post', () => {
    const testPost = {
      title: 'Test Post Title',
      body: 'Test Post Content'
    };

    // Fill in the form
    cy.get('[data-cy="post-title-input"]').type(testPost.title);
    cy.get('[data-cy="post-body-input"]').type(testPost.body);

    // Submit the form
    cy.get('[data-cy="submit-post-btn"]').click();

    // Wait for API response
    cy.wait('@createPost');

    // Check success message
    cy.get('[data-cy="success-message"]')
      .should('be.visible')
      .and('contain', 'Post created successfully!');

    // Check if new post appears in the list
    cy.get('[data-cy="posts-list"] p').first().should('contain.text', testPost.body);
  });

  it('should handle post creation errors', () => {
    // Override the intercept to simulate an error
    cy.intercept('POST', 'https://jsonplaceholder.typicode.com/posts', {
      statusCode: 500,
      body: { error: 'Server error' }
    }).as('createPostError');

    // Fill in the form
    cy.get('[data-cy="post-title-input"]').type('Error Test Post');
    cy.get('[data-cy="post-body-input"]').type('This should fail');

    // Submit the form
    cy.get('[data-cy="submit-post-btn"]').click();

    // Wait for API response
    cy.wait('@createPostError');

    // Check error message
    cy.get('[data-cy="error-message"]')
      .should('be.visible')
      .and('contain', 'Failed to create post');
  });

  it('should delete a post', () => {
    // Wait for posts to load
    cy.wait('@getPosts');

    // Delete first post
    cy.get('[data-cy="delete-post-1"]').click();

    // Wait for delete request
    cy.wait('@deletePost');

    // Check success message
    cy.get('[data-cy="success-message"]')
      .should('be.visible')
      .and('contain', 'Post deleted successfully!');

    // Verify post is removed from the list
    cy.get('[data-cy="post-item-1"]').should('not.exist');
  });

  it('should handle delete errors', () => {
    // Override the intercept to simulate an error
    cy.intercept('DELETE', 'https://jsonplaceholder.typicode.com/posts/*', {
      statusCode: 500,
      body: { error: 'Server error' }
    }).as('deletePostError');

    // Wait for posts to load
    cy.wait('@getPosts');

    // Try to delete a post
    cy.get('[data-cy="delete-post-1"]').click();

    // Wait for delete request
    cy.wait('@deletePostError');

    // Check error message
    cy.get('[data-cy="error-message"]')
      .should('be.visible')
      .and('contain', 'Failed to delete post');
  });

  it('should refresh posts list', () => {
    // Wait for initial load
    cy.wait('@getPosts');

    // Click refresh button
    cy.get('[data-cy="refresh-posts-btn"]').click();

    // Check loading state
    cy.get('[data-cy="loading-indicator"]').should('not.exist');

    // Wait for new API call
    cy.wait('@getPosts');

    // Verify posts are displayed
    cy.get('[data-cy="posts-list"]').should('be.visible');
  });
}); 