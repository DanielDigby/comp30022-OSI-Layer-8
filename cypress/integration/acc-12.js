describe("10. User can add a filter", () => {
  it("Can add a filter to the list of filters on the right side", () => {
    // can use this register hook to auth a user before doing the rest of the testing
    cy.register();
    cy.visit("/notes");

    // create a note
    cy.get('*[class^="NewNote_container"]').click();
    cy.get("#edit-title").type("new title");
    cy.get("#edit-text").type("new text");
    cy.get('*[class^="ui orange tiny icon button"]').click();

    // delete the note
    cy.get('*[class^="StandardNote_outerContainer"]').click();
    cy.get('*[class^="grey trash alternate outline icon"]').click();
    cy.get('*[class^="red trash alternate icon"]').click();

    // note should be deleted
    cy.get('*[class^="dragAndDrop_item"]').should("not.exist");
  });
});
