import {Box, Button} from "@mui/material";
import React, {useState} from "react";
import {Product} from "../product";
import {changeQuantity} from "../productsApiClient";

type ProductDisplayProps = {
  product: Product
  createAlertMessage: (message: string) => void
}

export const ProductDisplay = ({product, createAlertMessage}: ProductDisplayProps) => {
  const [quantity, setQuantity] = useState(product.quantity)
  const [orderAmount, setOrderAmount] = useState(0)

  const increaseQuantity = () => {
    setQuantity(prevState => prevState + 1)
  }

  const saveQuantity = () => {
    changeQuantity(product.id, quantity)
  }

  const changeOrderAmount = (amount: number) => {
    if (orderAmount === 0 && amount === -1) {
      return
    } else {
      setOrderAmount(prevState => prevState + amount)
    }
  }

  function orderPlaced(orderedAmount: number, productName: string, remainingInventory: boolean, notDelivered?: number) {
    remainingInventory ? createAlertMessage(`You will receive - ${productName} x ${orderedAmount}.`) :
      createAlertMessage(`You will receive - ${productName} x ${orderedAmount}.\nNote that your order was NOT completely fulfilled. Your delivery will be short ${notDelivered} items.`)
  }

  const placeOrder = () => {
    if (orderAmount <= quantity) {
      const newQuantity = quantity - orderAmount
      changeQuantity(product.id, newQuantity)
        .then(() => setQuantity(newQuantity))
      orderPlaced(newQuantity, product.name, true)
    } else if (orderAmount >= quantity) {
      const notDelivered = orderAmount - quantity
      changeQuantity(product.id, 0)
        .then(() => setQuantity(0))
      orderPlaced(quantity, product.name, false, notDelivered)
    }
  }

  return (
    <Box display={"flex"} flexDirection={"row"}>
      <Box>
        {product.name}
      </Box>
      <Box ml={14} aria-label={'Current Inventory'}>
        Inventory: {quantity}
      </Box>
      <Box ml={3}>
        <Button variant={'outlined'} onClick={() => increaseQuantity()}>Increase</Button>
        <Button variant={'outlined'} sx={{marginLeft: '1em'}} onClick={() => saveQuantity()}>Save</Button>
      </Box>
      <Box ml={10} aria-label={'Order Amount'}>
        Order: {orderAmount}
        <Button onClick={() => changeOrderAmount(1)} variant={'outlined'} sx={{marginLeft: '.5em'}}>More</Button>
        <Button onClick={() => changeOrderAmount(-1)} variant={'outlined'} sx={{marginLeft: '.5em'}}>Less</Button>
        <Button onClick={() => placeOrder()} variant={'outlined'} sx={{marginLeft: '.5em'}}>Place Order</Button>
      </Box>
    </Box>
  )
}