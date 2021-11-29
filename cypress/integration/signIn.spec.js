/* eslint-disable no-undef */
/// <reference types="cypress" />
import faker from 'faker';

describe('Sign-in', () => {
  it('should be able to access signIn page and ', () => {
    cy.visit('http://localhost:3000');

    cy.url().should('equal', 'http://localhost:3000/sign-in');
  });

  it('should have 2 input fields and "Entrar" button', () => {
    cy.visit('http://localhost:3000/sign-in');

    cy.get('input').should('have.length', 2);
    cy.get('button').should('have.text', 'Entrar');
  });
});