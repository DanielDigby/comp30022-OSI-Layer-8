describe('6. User can edit notes on notes page', () => {
  
    it('Can drag a note on the notes page to a new location', () => {
      cy.register()
      cy.visit('/notes')

      // create a note
      cy.addNote("hello")

      // open edit for the new note
      cy.get('*[class^="StandardNote_outerContainer"]').click()
      cy.get('*[class^="edit icon"]').click()

      // edit and save
      cy.get('#edit-title').type("new title")
      cy.get('#edit-text').type("new text")
      cy.get('*[class^="ui orange tiny icon button"]').click()

      cy.get('*[class^="StandardNote_titleContainer"]').contains('new title')
    })
  })