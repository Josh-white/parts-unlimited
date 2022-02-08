import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import App from "../App";
import {getProducts} from "../productsApiClient";

jest.mock("../productsApiClient");

const mockGetProducts = getProducts as jest.MockedFunction<typeof getProducts>;

describe("App", () => {
  it('should render the headers', async () => {
    mockGetProducts.mockResolvedValueOnce([
      {
        id: 1,
        name: "shiny new product",
        quantity: 0
      },
      {
        id: 2,
        name: "crusty old product",
        quantity: 3
      }]);

    await waitFor(() => {
      render(<App/>)
    })

    expect(screen.getByText("Parts Unlimited Inventory")).toBeInTheDocument();
    expect(screen.getByText("Product Creator")).toBeVisible()
    expect(screen.getByText("Product")).toBeVisible()
    expect(screen.getByText("Quantity")).toBeVisible()
    expect(screen.getByText("Add Quantity")).toBeVisible()
    expect(screen.getByText("Place Order")).toBeVisible()

    expect(await mockGetProducts).toHaveBeenCalledTimes(1)
  });
});
