import "cypress-file-upload";

describe("21. A user can store an image", () => {
  it(
    "Navigates to the notes page to create a new note with an image upload." +
      "Succeeds when the image is successfully loaded and displayed in the notes page.",
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
