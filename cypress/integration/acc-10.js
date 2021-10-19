describe('10. User can add a filter', () => {
  
    it('Can add a filter to the list of filters on the right side', () => {
      // can use this register hook to auth a user before doing the rest of the testing
      cy.register()
      cy.visit('/notes')

      // add a filter
      cy.get('*[class^="plus large icon"]').click()
      cy.get('#input-tag').type("new tag")
      cy.get('*[class^="plus icon"]').click()
      cy.get('*[class^="ui fluid secondary vertical menu"]').children().contains('New Tag')
    })
  })