// User can reposition notes on dashboard
describe("4. User can reposition notes on dashboard", () => {
  it(
    "Creates a note, visits dashboard." +
      "Succedes when the note can be dragged to another column",
    () => {
      // visit notes page
      cy.register();
      cy.visit("/notes");

      // create notes to drag
      cy.get('*[class^="NewNote_container"]').click();
      cy.get("#edit-title").type("new title");
      cy.get("#edit-text").type("new text");
      cy.get('*[class^="grey thumbtack icon"]').click();
      cy.get('*[class^="ui orange tiny icon button"]').click();

      // go back to dashboard and check if pinned is draggable
      cy.visit("/");
      cy.dragAndDrop('*[class^="StandardNote_outerContainer"]', "#col2");
    }
  );
});
