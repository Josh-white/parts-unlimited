import {Box, Button} from "@mui/material";
import React, {useState} from "react";
import {Product} from "../product";
import {changeQuantity} from "../productsApiClient";

type ProductDisplayProps = {
  product: Product
}

export const ProductDisplay = ({product}: ProductDisplayProps) => {
  const [quantity, setQuantity] = useState(product.quantity)
  const [orderAmount, setOrderAmount] = useState(0)

  const increaseQuantity = () => {
    setQuantity(prevState => prevState + 1)
  }

  const saveQuantity = () => {
    changeQuantity(product.id, quantity)
  }

  return (
    <Box display={"flex"} flexDirection={"row"}>
      <Box>
        {product.name}
      </Box>
      <Box ml={14}>
        {quantity}
      </Box>
      <Box ml={10}>
        <Button variant={'outlined'} onClick={() => increaseQuantity()}>Increase</Button>
        <Button variant={'outlined'} sx={{marginLeft: '1em'}} onClick={() => saveQuantity()}>Save</Button>
      </Box>
      <Box ml={10}>
        {orderAmount}
        <Button variant={'outlined'} sx={{marginLeft: '.5em'}}>More</Button>
        <Button variant={'outlined'} sx={{marginLeft: '.5em'}}>Less</Button>
        <Button variant={'outlined'} sx={{marginLeft: '.5em'}}>Place Order</Button>
      </Box>
    </Box>
  )
}