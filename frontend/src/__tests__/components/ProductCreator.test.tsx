import {render, screen} from "@testing-library/react";
import React from "react";
import {createProduct} from "../../productsApiClient";
import userEvent from "@testing-library/user-event";
import {ProductCreator} from "../../components/ProductCreator";

jest.mock("../../productsApiClient");

const mockCreateProduct = createProduct as jest.MockedFunction<typeof createProduct>;

const addProduct = (product: string) => {
  userEvent.type(screen.getByLabelText("Product to add"), product);
  userEvent.click(screen.getByRole("button", {name: /submit/i}));
}

describe("when I add a new product", () => {
  it("should call createProduct", async () => {
    const mockRefresh = jest.fn()
    mockCreateProduct.mockResolvedValueOnce({id: 1, name: "shiny new product", quantity: 0});

    render(<ProductCreator refresh={mockRefresh}/>);
    addProduct("shiny new product");

    expect(mockCreateProduct).toHaveBeenCalledWith("shiny new product");
    expect(mockRefresh).toHaveBeenCalledTimes(1)
  });
});