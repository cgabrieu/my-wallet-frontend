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

  it('should receive a popup when empty email', () => {
    cy.visit('http://localhost:3000/sign-in');

    const password = faker.internet.password(10);
    cy.get('input[placeholder="Senha"]').type(password);

    cy.get('button').contains('Entrar').click();
    
    cy.contains('Insira um e-mail válido').should('be.visible')
  });

  it('should receive a popup when empty password', () => {
    cy.visit('http://localhost:3000/sign-in');

    const email = faker.internet.email();
    cy.get('input[placeholder="E-mail"]').type(email);

    cy.get('button').contains('Entrar').click();
    
    cy.contains('Sua senha não pode ficar em branco').should('be.visible')
  });

  it('should have user token on localStorage when valid access', () => {
    
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password(10);
    
    cy.signUp(name, email, password);
    
    cy.visit('http://localhost:3000/sign-in');
    cy.get('input[placeholder="E-mail"]').type(email);
    cy.get('input[placeholder="Senha"]').type(password);

    cy.get('button').contains('Entrar').click();

    cy.wait(500);
    cy.url().should('include', '/', ()=> {
      expect(localStorage.getItem('user')).to.exist()
  })
  });
});