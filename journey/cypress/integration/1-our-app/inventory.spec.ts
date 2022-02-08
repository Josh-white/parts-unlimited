const addProduct = (product: string) => {
  cy.findByLabelText("Product to add").type(product);
  cy.findByRole("button", {name: 'Submit'}).click();
}
describe("inventory", () => {
  describe("when adding a product offering", () => {
    it("should display the new product with a default quantity of 0", () => {
      cy.visit("http://localhost:8080");
      addProduct("shiny-new-product");
      cy.findByText("shiny-new-product").should("exist");
      cy.findByLabelText("Current Inventory").contains('0');
    });

    it('should be able to increase the quantity of items', () => {
      cy.visit("http://localhost:8080");
      cy.findByRole('button', {name: "Increase"}).click()
      cy.findByLabelText("Current Inventory").contains('1')
    });

    it('should show place order information', () => {
      cy.visit("http://localhost:8080");
      cy.findByRole('button', {name: "More"}).click()
      cy.findByLabelText("Order Amount").contains('1')
      cy.findByRole('button', {name: "Less"}).click()
      cy.findByRole('button', {name: "Place Order"}).click()

    });

  });
});
