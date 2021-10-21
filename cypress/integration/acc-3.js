// User can view pinned and event notes on dashboard
describe("1. A user can log in", () => {
  it(
    "Navigates to the dashboard." +
      "Succedes when it sees pinned and event notes",
    () => {
      // visit notes page
      cy.register();
      cy.visit("/notes");

      // create notes
      cy.get('*[class^="NewNote_container"]').click();
      cy.get("#edit-title").type("new title");
      cy.get("#edit-text").type("new text");
      cy.get('*[class^="grey thumbtack icon"]').click();
      cy.get('*[class^="ui orange tiny icon button"]').click();

      // go back to dashboard and check if pinned is visible
      cy.visit("/");
      cy.get('*[class^="StandardNote_outerContainer"]').contains("new title");
    }
  );
});
