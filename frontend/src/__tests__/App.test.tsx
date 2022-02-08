import React from "react";
import {render, screen} from "@testing-library/react";
import App from "../App";
import {getProducts} from "../productsApiClient";
import {verify} from "crypto";

jest.mock("../productsApiClient");

const mockGetProducts = getProducts as jest.MockedFunction<typeof getProducts>;

describe("App", () => {
  it('should render the headers', () => {
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
    render(<App/>)
    expect(screen.getByText("Parts Unlimited Inventory")).toBeInTheDocument();
    expect(screen.getByText("Product Creator")).toBeVisible()
    expect(mockGetProducts).toHaveBeenCalledTimes(1)
  });
});
