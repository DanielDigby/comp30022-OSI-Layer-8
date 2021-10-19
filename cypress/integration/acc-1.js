describe('1. A user can register', () => {
    it('Navigates to the sign up page and fills in necessary details.' +
        'Succedes when navigated from register url to dashboard', () => {
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
})