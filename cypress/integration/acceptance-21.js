import "cypress-file-upload";

describe("21. A user can store an image", () => {
  it(
    "KJDSFKJSDFJKSDFJKSDKJRegisters a new user then navigates to the notes page and creates a new note." +
      "Succeeds when it finds the button to share the new note with another user",
    () => {
      cy.register();

      // Visit notes page and create a new note
      cy.visit("/notes");
      cy.get('*[class^="NewNote_container"]').click();

      // Check that the add image button exists
      cy.get('*[class^="EditNote_button"]').contains("Add image").click();

      // Upload an image to the new note
      const filepath = "images/dog.jpeg";
      cy.get('input[type="file"]').attachFile(filepath);

      // Check the image is uploaded to the note
      cy.get('*[class^="EditNote_imageContainer"]');
      cy.get("img");
      cy.get('*[class^="EditNote_doneRow"]').click();

      // Check the note with image appears in the notes page
      cy.get('*[class^="StandardNote_image"]').click();
    }
  );
});
