import React, {useEffect, useState} from "react";
import {getProducts} from "./productsApiClient";
import {Alert, Box, Container} from "@mui/material";
import {Product} from "./product";
import {ProductCreator} from "./components/ProductCreator";
import {ProductDisplay} from "./components/ProductDisplay";

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [dirtyState, setDirtyState] = useState(0)
  const [successAlert, setSuccessAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  const refresh = () => {
    setDirtyState(prevState => prevState + 1)
  }

  const createAlertMessage = (message: string) => {
    setAlertMessage(message)
    setSuccessAlert(true)
  }

  useEffect(() => {
    getProducts().then(setProducts);
  }, [dirtyState]);

  return (
    <Container sx={{mx: 1, my: 1}}>
      <h1>Parts Unlimited Inventory</h1>
      <Box>
        <Box display='flex' flexDirection='row'>
          <Box>
            <h2>Product Creator</h2>
            <ProductCreator refresh={refresh}/>
          </Box>
        </Box>
        <Box display='flex' flexDirection='row'>
          <Box alignItems={"center"}>
            <h2>Product</h2>
          </Box>
          <Box ml={2}>
            <h2>Quantity</h2>
          </Box>
          <Box ml={10}>
            <h2>Add Quantity</h2>
          </Box>
          <Box ml={30}>
            <h2>Place Order</h2>
          </Box>
        </Box>
        <Box>
          {products.map((product) => (
            <ProductDisplay key={product.id} product={product} createAlertMessage={createAlertMessage}/>
          ))}
        </Box>
        <Box>
          {successAlert ? <Alert onClose={() => setSuccessAlert(false)} variant={"filled"} severity={"success"}> {alertMessage}</Alert> : <></>}
        </Box>
      </Box>
    </Container>
  );
}

export default App;
