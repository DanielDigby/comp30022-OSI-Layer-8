describe('6. User can reposition and edit notes on notes page', () => {
  
    it('Can drag a note on the notes page to a new location', () => {
      // can use this register hook to auth a user before doing the rest of the testing
      cy.register()
      cy.visit('/notes')

      // create a note to drag
      cy.get('*[class^="NewNote_container"]').click()
      cy.get('#edit-title').type("new title")
      cy.get('*[class^="ui orange tiny icon button"]').click()

      cy.dragAndDrop('*[class^="StandardNote_outerContainer"]', '#col2')
    })
  })