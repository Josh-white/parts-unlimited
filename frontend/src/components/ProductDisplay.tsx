import {Box} from "@mui/material";
import React from "react";
import {Product} from "../product";

type ProductDisplayProps = {
  products: Product[]
}

export const ProductDisplay = ({products}:ProductDisplayProps) => {
  return (
    <>
    <Box>
      <h2>Product</h2>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </Box>
    <Box ml={2}>
      <h2>Quantity</h2>
      {products.map((product) => (
        <div key={product.id}>{product.quantity}</div>
      ))}
    </Box>
</>
)
}