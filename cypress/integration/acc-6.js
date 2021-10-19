describe('6. User can create notes on notes page', () => {
  
    it('Can create a note using new note button', () => {
      cy.register()
      cy.visit('/notes')

      // create a note
      cy.get('*[class^="NewNote_container"]').click()
      cy.get('#edit-title').type("new title")
      cy.get('#edit-text').type("new text")
      cy.get('*[class^="ui orange tiny icon button"]').click()

      // check that the note was created
      cy.get('*[class^="dragAndDrop_item"]')
    })
  })