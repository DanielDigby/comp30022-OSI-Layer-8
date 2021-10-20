describe("16. A user can set an event time when creating a note", () => {
  it("Able to log in andn navigate to notes page. Succeeds when the user is able to create a note with an event time", () => {
    cy.register();
    cy.visit("/notes");

    cy.get('*[class^="NewNote_container"]').click();
    cy.get('*[class^="EditNote_title"]').type("Testing Note title");
    cy.get('*[class^="EditNote_content"]').type(
      "Helloworld testing the note content"
    );

    cy.get("#add-event-time").click();
    cy.get('*[class^="EditNote_timePicker"]').click();
    cy.get("#event-time-input").type("00:00 01-01-2022");

    cy.get('*[class^="EditNote_done"]').click();

    cy.get("#event-time");
  });
});
