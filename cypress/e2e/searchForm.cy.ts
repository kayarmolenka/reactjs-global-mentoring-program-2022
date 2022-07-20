import { cy } from 'local-cypress';

describe('App E2E', () => {
  it('should visit http://localhost:9100', () => {
    cy.visit('http://localhost:9100/');

    cy.url().should('include', '/search');
  });

  it('should redirect to Star Wars movie after input date in search and click search button', () => {
    cy.get('input').should('have.value', '');

    cy.get('input').type('movie=:181808');
    cy.contains('Search').click();

    cy.url().should('include', '/movie=:181808');
  });
  it('should check the page contains Star Wars title', () => {
    cy.get('h2').should('have.text', 'Star Wars: The Last Jedi');
  });
  it('should redirect to back after click on logo', () => {
    cy.contains('netflix').click();

    cy.url().should('include', '/search');
  });
});
