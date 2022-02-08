import {render, screen} from "@testing-library/react";
import React from "react";
import {ProductDisplay} from "../../components/ProductDisplay";
import userEvent from "@testing-library/user-event";
import {addQuantity} from "../../productsApiClient";

jest.mock("../../productsApiClient");

const mockAddQuantity = addQuantity as jest.MockedFunction<typeof addQuantity>;

describe("when I view the inventory", () => {
  beforeEach(() => {

    const product = {id: 1, name: "a product", quantity: 0};
    render(<ProductDisplay product={product}/>);
  })

  it("should display the products and inventory", async () => {

    expect(await screen.findByText("a product")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it('should display a button to increase the quantity and save amount', () => {

    expect(screen.getByRole('button', {name: 'Increase'})).toBeVisible()
    expect(screen.getByRole('button', {name: 'Save'})).toBeVisible()
  });

  it('should increase the quantity when Increase button is clicked', async () => {
    expect(screen.getByText("0")).toBeVisible()
    userEvent.click(screen.getByRole('button', {name: 'Increase'}))
    expect(await screen.getByText('1')).toBeVisible()
  });
});
describe('when I increase amount of quantity', () => {
  it('should save the amount of product when save is clicked', async () => {
    mockAddQuantity.mockResolvedValueOnce({id: 1, name: 'a product', quantity: 2})
    const product = {id: 1, name: "a product", quantity: 0};

    render(<ProductDisplay product={product}/>);

    userEvent.click(screen.getByRole('button', {name: 'Increase'}))
    userEvent.click(screen.getByRole('button', {name: 'Save'}))
    expect(mockAddQuantity).toHaveBeenCalledTimes(1)
  });
})

