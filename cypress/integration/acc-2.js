// User can log in
describe("1. A user can log in", () => {
  it(
    "Navigates to the login page and fills in necessary details." +
      "Succedes when navigated from login url to dashboard",
    () => {
      cy.register();
      cy.visit("/");

      // Check that we are on the dashboard page
      cy.url().should("be.equal", "http://localhost:3000/");
    }
  );
});
