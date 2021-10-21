// User can view pinned and event notes on dashboard
describe("1. A user can log in", () => {
  it(
    "Navigates to the dashboard." +
      "Succedes when it sees pinned and event notes",
    () => {
      cy.visit("/dashboard");
      cy.get("#input-email").type("test.user@email.com");
      cy.get("#input-password").type("Password");
      cy.get("form").submit();
      cy.on("window:confirm", (str) => {
        expect(str).to.contain(`We use cookies to personalise content in cara`);
        cy.on("window:confirm", () => true);
      });
      cy.url().should("be.equal", "http://localhost:3000/");
    }
  );
});
