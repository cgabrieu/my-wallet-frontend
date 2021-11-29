/* eslint-disable no-undef */
Cypress.Commands.add('signUp', (name, email, password) => {
  cy.visit('http://localhost:3000/sign-up');

  cy.get('input[placeholder="Nome"]').type(name);
  cy.get('input[placeholder="E-mail"]').type(email);
  cy.get('input[placeholder="Senha"]').type(password);
  cy.get('input[placeholder="Confirme a senha"]').type(password);

  cy.get('button').click();
});

Cypress.Commands.add('signIn', (email, password) => {
  cy.visit('http://localhost:3000/sign-in');

  cy.get('input[placeholder="E-mail"]').type(email);
  cy.get('input[placeholder="Senha"]').type(password);

  cy.get('button').click();
});

Cypress.Commands.add('addTransaction', (name, email, password) => {
  cy.signUp(name, email, password);
  cy.signIn(email, password);
});
