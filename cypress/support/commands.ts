/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("getDataCy", (dataTestSelector: string) => {
  return cy.get(`[data-cy="${dataTestSelector}"]`);
});

Cypress.Commands.add("verifyActiveStep", (stepNum) => {
  const steps = [1, 2, 3, 4];
  if (stepNum) {
    cy.get(`[data-cy='step-${stepNum}']`).within(() => {
      cy.get(`[data-cy='step-circle']`).should("have.class", "bg-primary");
    });
  }
  steps
    .filter((num) => num !== stepNum)
    .forEach((num) => {
      cy.get(`[data-cy='step-${num}']`).within(() => {
        cy.get(`[data-cy='step-circle']`).should("not.have.class", "bg-primary");
      });
    });
});
