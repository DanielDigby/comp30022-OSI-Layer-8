describe('Example', () => {
  
    it('successfully loads', () => {
      // can use this register hook to auth a user before doing the rest of the testing
      cy.register()

      cy.visit('/')
    })
  })