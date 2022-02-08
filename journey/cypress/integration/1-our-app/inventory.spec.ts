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
      cy.findByRole('button', {name: "Increase"}).click()
      cy.findByLabelText("Current Inventory").contains('2')
      cy.findByRole('button', {name: 'Save'}).click()
    });

    it('should show place order information', () => {
      cy.visit("http://localhost:8080");
      cy.findByRole('button', {name: "More"}).click()
      cy.findByRole('button', {name: "More"}).click()
      cy.findByLabelText("Order Amount").contains('2')
      cy.findByRole('button', {name: "Less"}).click()
      cy.findByRole('button', {name: "Place Order"}).click()
      cy.findByRole('alert').contains('You will receive - shiny-new-product x 1.')
      cy.findByRole('button', {name: 'Close'}).click()
    });
    // run this as an only please

    // it('should partially fulfill an order ', () => {
    //   cy.visit("http://localhost:8080");
    //   addProduct("shiny-new-product");
    //   cy.findByRole('button', {name: "Increase"}).click()
    //   cy.findByRole('button', {name: 'Save'}).click()
    //   cy.findByRole('button', {name: "More"}).click()
    //   cy.findByRole('button', {name: "More"}).click()
    //   cy.findByRole('button', {name: "Place Order"}).click()
    //   cy.findByRole('alert').contains('You will receive - shiny-new-product x 1.\nNote that your order was NOT completely fulfilled. Your delivery will be short 1 items.')
    //   cy.findByRole('button', {name: 'Close'}).click()
    // });

  });
});
