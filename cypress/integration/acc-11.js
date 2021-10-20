describe("11. User can search their notes ", () => {
  it("Can display the right note when searching for it in the search bar", () => {
    cy.register();
    cy.visit("/notes");

    // create note
    cy.get('*[class^="NewNote_container"]').click();
    cy.get("#edit-title").type("new title");
    cy.get("#edit-text").type("new text");
    cy.get('*[class^="ui orange tiny icon button"]').click();

    // search for the note
    cy.get("input.prompt").type("find");

    // note should not be found
    cy.get('*[class^="dragAndDrop_item"]').should("not.exist");
  });
});
