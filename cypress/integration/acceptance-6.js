describe('5. User can navigate from dashboard to notes page', () => {
  
    it('Can move to notes page to view all notes from dashboard page after auth', () => {
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