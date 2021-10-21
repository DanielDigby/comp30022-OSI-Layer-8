describe("19. A user can link notes", () => {
  it(
    "Registers a new user then navigates to the notes page and opens the new note editor." +
      "Succeeds when it finds the button to link the new note to another note",
    () => {
      cy.register();
      cy.visit("/notes");

      // Click on the button to create a new note
      cy.get('*[class^="NewNote_container"]').click();

      // This step here should fail as linking notes has not yet been implemented
      cy.get("notelink").should("exist");
    }
  );
});
