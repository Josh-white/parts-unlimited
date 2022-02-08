import React, {useEffect, useState} from "react";
import {getProducts} from "./productsApiClient";
import {Box, Container} from "@mui/material";
import {Product} from "./product";
import {ProductCreator} from "./components/ProductCreator";
import {ProductDisplay} from "./components/ProductDisplay";

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [dirtyState, setDirtyState] = useState(0)

  const refresh = () => {
    setDirtyState(prevState => prevState + 1)
  }

  useEffect(() => {
    getProducts().then(setProducts);
  }, [dirtyState]);

  return (
    <Container sx={{mx: 1, my: 1}}>
      <h1>Parts Unlimited Inventory</h1>
      {/*TODO figure out how to get these into two columns*/}
      <Box>
        <Box display='flex' flexDirection='row'>
          <Box alignItems={"center"}>
            <h2>Product</h2>
          </Box>
          <Box ml={2}>
            <h2>Quantity</h2>
          </Box>
          <Box ml={5}>
            <h2>Add Quantity</h2>
          </Box>
          <Box ml={40}>
            <h2>Place Order</h2>
          </Box>
        </Box>
        <Box>
          {products.map((product) => (
            <ProductDisplay key={product.id} product={product}/>
          ))}
        </Box>
        <Box display='flex' flexDirection='row'>
          <Box>
            <h2>Product Creator</h2>
            <ProductCreator refresh={refresh}/>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
