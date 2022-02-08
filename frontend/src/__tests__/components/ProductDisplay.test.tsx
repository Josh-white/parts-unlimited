import {render, screen} from "@testing-library/react";
import React from "react";
import {ProductDisplay} from "../../components/ProductDisplay";
import userEvent from "@testing-library/user-event";
import {changeQuantity} from "../../productsApiClient";

jest.mock("../../productsApiClient");

const mockAddQuantity = changeQuantity as jest.MockedFunction<typeof changeQuantity>;

describe("when I view the inventory", () => {

  it("should display the products and inventory", async () => {

    const product = {id: 1, name: "a product", quantity: 0};
    render(<ProductDisplay product={product}/>);

    expect(await screen.findByText("a product")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it('should display a button to increase the quantity and save amount', () => {


    const product = {id: 1, name: "a product", quantity: 0};
    render(<ProductDisplay product={product}/>);

    expect(screen.getByRole('button', {name: 'Increase'})).toBeVisible()
    expect(screen.getByRole('button', {name: 'Save'})).toBeVisible()
  });

  it('should increase the quantity when Increase button is clicked', async () => {

    const product = {id: 1, name: "a product", quantity: 0};
    render(<ProductDisplay product={product}/>);

    expect(screen.getByText("0")).toBeVisible()
    userEvent.click(screen.getByRole('button', {name: 'Increase'}))
    expect(await screen.getByText('1')).toBeVisible()
  });

  it('should save the amount of product when save is clicked', async () => {
    mockAddQuantity.mockResolvedValueOnce({id: 1, name: 'a product', quantity: 2})
    const product = {id: 1, name: "a product", quantity: 0};

    render(<ProductDisplay product={product}/>);

    userEvent.click(screen.getByRole('button', {name: 'Increase'}))
    userEvent.click(screen.getByRole('button', {name: 'Save'}))
    expect(mockAddQuantity).toHaveBeenCalledTimes(1)
  });

  it('should show a default amount and buttons to increase, decrease, and place order', () => {
    const product = {id: 1, name: "a product", quantity: 2};

    render(<ProductDisplay product={product}/>);

    expect(screen.getByText("0")).toBeVisible()
    expect(screen.getByRole('button', {name: 'More'})).toBeVisible()
    expect(screen.getByRole('button', {name: 'Less'})).toBeVisible()
    expect(screen.getByRole('button', {name: 'Place Order'})).toBeVisible()
  });
});
