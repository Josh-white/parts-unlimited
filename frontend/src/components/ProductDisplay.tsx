import {Box, Button} from "@mui/material";
import React, {useState} from "react";
import {Product} from "../product";
import {addQuantity} from "../productsApiClient";

type ProductDisplayProps = {
  product: Product
}

export const ProductDisplay = ({product}: ProductDisplayProps) => {
  const [quantity, setQuantity] = useState(product.quantity)

  const increaseQuantity = () => {
    setQuantity(prevState => prevState + 1)
  }


  const saveQuantity = () => {
    addQuantity(product.id, quantity)
  }

  return (
    <>
      <Box>
        {product.name}
      </Box>
      <Box>
        {quantity}
      </Box>
      <Box>
        <Button onClick={() => increaseQuantity()}>Increase</Button>
        <Button sx={{marginLeft: '1em'}} onClick={() => saveQuantity()}>Save</Button>
      </Box>
    </>
  )
}