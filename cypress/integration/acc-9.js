describe('9. User can filter notes on notes page', () => {
  
    it('Can filter out notes by selecting a filter on the right side', () => {
      // can use this register hook to auth a user before doing the rest of the testing
      cy.register()
      cy.visit('/notes')

      // create a note to filter
      cy.addNote("hello")

      // apply a filter
      cy.get('*[class^="header item"]').contains('Pinned').click()

      // note should be filtered out
      cy.get('*[class^="dragAndDrop_item"]').should('not.exist');
    })
  })