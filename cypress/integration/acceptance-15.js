describe("15. A user can set a reminder time when creating a note", () => {
  it("Able to log in andn navigate to notes page. Succeeds when the user is able to create a note with a reminder time", () => {
    cy.register();
    cy.visit("/notes");

    cy.get('*[class^="NewNote_container"]').click();
    cy.get('*[class^="EditNote_title"]').type("Testing Note title");
    cy.get('*[class^="EditNote_content"]').type(
      "Helloworld testing the note content"
    );

    cy.get("#add-reminder").click();
    cy.get('*[class^="EditNote_timePicker"]').click();
    cy.get("#reminder-time-input").type("00:00 12-25-2021");

    cy.get('*[class^="EditNote_done"]').click();

    cy.get("#reminder-time");
  });
});
