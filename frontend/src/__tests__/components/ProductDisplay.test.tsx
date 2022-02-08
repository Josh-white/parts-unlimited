import {render, screen} from "@testing-library/react";
import React from "react";
import {ProductDisplay} from "../../components/ProductDisplay";

describe("when I view the inventory", () => {
  it("should display the products and inventory", async () => {
    const products = [{id: 1, name: "a product", quantity: 0}];

    render(<ProductDisplay products={products}/>);

    expect(await screen.findByText("a product")).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("Quantity")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});