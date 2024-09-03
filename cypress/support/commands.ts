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

Cypress.Commands.add('prepare', (email, password) => {
    cy.viewport(1920, 1080);
    // cy.intercept('POST', 'auth/login', {fixture: 'login'});
    cy.intercept({ method: "GET", url: "ingredients" }, { statusCode: 200, fixture: "ingredients.json" });
    // cy.intercept('GET', 'auth/user', {fixture: 'user'});

    // cy.visit('http://localhost:3000/profile');
    // cy.get('[data-testid=email-input]').type(`${email}`);
    // cy.get('[data-testid=password-input]').type(`${password}`);
    // cy.get('[data-testid=submit-button]').type(`{enter}`);
    // window.localStorage.setItem(
    //     "refreshToken", JSON.stringify("aa70f81f6fd1346c64cc70d8cc64e750a41aabb3dce8f697b59e648a645eb10c32c4cf4d8d955507")
    // );
    // window.localStorage.setItem(
    //     "accessToken", JSON.stringify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTc4MWJkMTE5ZDQ1MDAxYjRmOTg0ZSIsImlhdCI6MTcyNTM2MDk1NiwiZXhwIjoxNzI1MzYyMTU2fQ.x8NNZ7fMK9IVdFAAuczIk8HE5Bq13tGcZXqS2EsxxII")
    // );

})