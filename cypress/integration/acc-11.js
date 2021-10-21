describe("11. User can search their notes ", () => {
  it("Can display the right note when searching for it in the search bar", () => {
    cy.register();
    cy.visit("/notes");

    // create notes
    cy.get('*[class^="NewNote_container"]').click();
    cy.get("#edit-title").type("new title");
    cy.get("#edit-text").type("new text");
    cy.get('*[class^="ui orange tiny icon button"]').click();

    cy.get('*[class^="NewNote_container"]').click();
    cy.get("#edit-title").type("the note");
    cy.get("#edit-text").type("new text");
    cy.get('*[class^="ui orange tiny icon button"]').click();

    // search for the note
    cy.get("input.prompt").type("the note");

    // there should only be one out of two note displayed
    cy.get('*[class^="dragAndDrop_item"]').should(($items) => {
      expect($items).to.have.length(1);
    });
  });
});
