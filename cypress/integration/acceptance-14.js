describe("14. A user can add a tag while editing a note", () => {
  it("Able to move to the notes page and create a new note. Succeeds after being able to add a tag in the new note", () => {
    cy.register();
    cy.visit("/notes");
    cy.get('*[class^="NewNote_container"]').click();
    cy.get('*[class^="EditNote_title"]').type("Testing Note title");
    cy.get('*[class^="EditNote_content"]').type(
      "Helloworld testing the note content"
    );
    cy.get("#add-tag").type("testTag");
    cy.get('*[class^="EditNote_done"]').click();

    cy.get('*[class^="Note_tag"]');
  });
});
