// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- Use this register command for tests that need auth --
Cypress.Commands.add('register', () => { 
    cy.visit('/register')
        cy.get('#input-email')
            .type('test.user@email.com')
        cy.get('#input-first-name')
            .type('Sarah')
        cy.get('#input-last-name')
            .type('Smith')
        cy.get('#input-password-1')
            .type('Password1')
        cy.get('#input-password-2')
            .type('Password1')
        cy.get('form').submit()
        cy.on('window:confirm', (str) => {
            expect(str).to.contain(`We use cookies to personalise content in cara`)
            cy.on('window:confirm', () => true);
        })
        cy.url()
            .should('be.equal', 'http://localhost:3000/')
    })
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
