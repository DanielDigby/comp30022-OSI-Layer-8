describe("13. A user can choose a colour scheme ", () => {
  it("Able to move to the settings page. Succeeds then the user clicks a colour and the colour scheme changes to chosen colour.", () => {
    cy.register();
    cy.visit("/settings");

    cy.get("#colour-choices");
  });
});
