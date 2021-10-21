// User can log in
describe("1. A user can log in", () => {
  it(
    "Navigates to the login page and fills in necessary details." +
      "Succedes when navigated from login url to dashboard",
    () => {
      // Goes to the dashboard page
      cy.register();
      cy.visit("/dashboard");

      cy.get("EventNote_Segment__oFjQB");

      cy.get("DashboardView_pinnedNotesContainer__2SmGG");
    }
  );
});
