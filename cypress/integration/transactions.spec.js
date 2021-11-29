/* eslint-disable no-undef */
/// <reference types="cypress" />
import faker from 'faker';

describe('Transactions', () => {
  it('should be able to access transactions page ', () => {
    cy.visit('http://localhost:3000/sign-in');

    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password(10);

    cy.transaction(name, email, password);

    cy.contains('Nova entrada').should('be.visible');
    cy.contains('Nova saída').should('be.visible');
    cy.url().should('include', '/');
  });

  it('should be able to access new input transactions page', () => {
    cy.contains('Nova entrada').click();

    cy.url().should('include', '/new-input');
  });

  it('should be able to create a new input', () => {
    cy.get('input[placeholder="Valor (R$)"]').type(
      faker.datatype.number({
        min: 0,
        max: 999,
      })
    );
    cy.get('input[placeholder="Descrição"]').type(faker.lorem.words(2));

    cy.get('button').contains('Salvar Entrada').click();
    cy.url().should('include', '/');
  });

  it('should be able to access new output transactions page', () => {
    cy.contains('Nova saída').click();

    cy.url().should('include', '/new-output');
  });

  it('should be able to create a new output', () => {
    cy.get('input[placeholder="Valor (R$)"]').type(
      faker.datatype.number({
        min: 0,
        max: 999,
      })
    );
    cy.get('input[placeholder="Descrição"]').type(faker.lorem.words(2));

    cy.get('button').contains('Salvar Saída').click();
    cy.url().should('include', '/');
  });
});
