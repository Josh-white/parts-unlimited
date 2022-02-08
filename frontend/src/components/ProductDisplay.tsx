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

  function changeOrderAmount(amount: number) {
    if (orderAmount > 0) {
      setOrderAmount(prevState => prevState + amount)
    }
  }

  return (
    <Box display={"flex"} flexDirection={"row"}>
      <Box>
        {product.name}
      </Box>
      <Box ml={14} aria-label={'Current Inventory'}>
        {quantity}
      </Box>
      <Box ml={10}>
        <Button variant={'outlined'} onClick={() => increaseQuantity()}>Increase</Button>
        <Button variant={'outlined'} sx={{marginLeft: '1em'}} onClick={() => saveQuantity()}>Save</Button>
      </Box>
      <Box ml={10} aria-label={'Order Amount'}>
        Order {orderAmount}
        <Button onClick={() => changeOrderAmount(1)} variant={'outlined'} sx={{marginLeft: '.5em'}}>More</Button>
        <Button onClick={() => changeOrderAmount(-1)} variant={'outlined'} sx={{marginLeft: '.5em'}}>Less</Button>
        <Button variant={'outlined'} sx={{marginLeft: '.5em'}}>Place Order</Button>
      </Box>
    </Box>
  )
}