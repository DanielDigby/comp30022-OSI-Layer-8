describe("20. A user can share notes with another user", () => {
  it(
    "Registers a new user then navigates to the notes page and opens the new note editor." +
      "Succeeds when it finds the button to link the new note to another note",
    () => {
      cy.register();
      cy.visit("/notes");
      cy.get('*[class^="NewNote_container"]').click();
      cy.get('*[class^="EditNote_title"]').type("Hello, World");
      cy.get('*[class^="EditNote_doneRow"]').click();

      // Open the new note to standard detail view
      cy.get('*[class^="StandardNote_outerContainer"]').click();

      // This step here should fail as sharing of notes has not yet been implemented
      cy.get("share").should("exist");
    }
  );
});
