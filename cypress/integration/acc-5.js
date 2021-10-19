describe('5. User can navigate from dashboard to notes page', () => {
  
    it('Can move to notes page to view all notes from dashboard page after auth', () => {
      // can use this register hook to auth a user before doing the rest of the testing
      cy.register()
      cy.get('*[class^="grey arrow right big icon"]').click()
      cy.url()
            .should('be.equal', 'http://localhost:3000/notes')
    })
  })