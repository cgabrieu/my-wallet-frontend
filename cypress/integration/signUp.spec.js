/* eslint-disable no-undef */
/// <reference types="cypress" />
import faker from 'faker';

describe('Sign up', () => {
  it('should be able to access signUp page', () => {
    cy.visit('http://localhost:3000');
    cy.get('p').contains('Primeira vez? Cadastre-se!').click();

    cy.url().should('equal', 'http://localhost:3000/sign-up');
  });

  it('should be able to access signIn page', () => {
    cy.visit('http://localhost:3000/sign-up');
    cy.get('p').contains('Já tem uma conta? Entre agora!').click();

    cy.url().should('equal', 'http://localhost:3000/sign-in');
  });

  it('should have 4 input fields and "Entrar" button', () => {
    cy.visit('http://localhost:3000/sign-up');

    cy.get('input').should('have.length', 4);
    cy.get('button').should('have.length', 1);
  });

  it('should receive a popup when empty name', () => {
    cy.visit('http://localhost:3000/sign-up');

    const email = faker.internet.email();
    const password = faker.internet.password(10);

    cy.get('input[placeholder="E-mail"]').type(email);
    cy.get('input[placeholder="Senha"]').type(password);
    cy.get('input[placeholder="Confirme a senha"]').type(password);

    cy.get('button').contains('Cadastrar').click();
    
    cy.contains('Insira um nome válido').should('be.visible')
  });

  it('should receive a popup when empty email', () => {
    cy.visit('http://localhost:3000/sign-up');

    const name = faker.name.findName();
    const password = faker.internet.password(10);

    cy.get('input[placeholder="Nome"]').type(name);
    cy.get('input[placeholder="Senha"]').type(password);
    cy.get('input[placeholder="Confirme a senha"]').type(password);

    cy.get('button').contains('Cadastrar').click();

    cy.contains('Insira um e-mail válido').should('be.visible')
  });

  it('should receive a popup when empty password', () => {
    cy.visit('http://localhost:3000/sign-up');

    const name = faker.name.findName();
    const email = faker.internet.email();

    cy.get('input[placeholder="Nome"]').type(name);
    cy.get('input[placeholder="E-mail"]').type(email);

    cy.get('button').contains('Cadastrar').click();

    cy.contains('Digite uma senha mais forte').should('be.visible')
  });
  it('should receive a message when dont match passwords', () => {
    cy.visit('http://localhost:3000/sign-up');

    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password(10);
    const otherPassword = faker.internet.password(10);

    cy.get('input[placeholder="Nome"]').type(name);
    cy.get('input[placeholder="E-mail"]').type(email);
    cy.get('input[placeholder="Senha"]').type(password);
    cy.get('input[placeholder="Confirme a senha"]').type(otherPassword);

    cy.get('button').contains('Cadastrar').click();

    cy.contains('As senhas não combinam').should('be.visible')
  });
  
  it('should be redirect to signIn when valid access', () => {
    cy.visit('http://localhost:3000/sign-up');

    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password(10);

    cy.get('input[placeholder="Nome"]').type(name);
    cy.get('input[placeholder="E-mail"]').type(email);
    cy.get('input[placeholder="Senha"]').type(password);
    cy.get('input[placeholder="Confirme a senha"]').type(password);

    cy.get('button').contains('Cadastrar').click();

    cy.url().should('equal', 'http://localhost:3000/sign-in');
  });
});