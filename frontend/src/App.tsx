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
      <Box display={'flex'} flexDirection={'column'}>
        <Box display='flex' flexDirection='row'>
        <ProductDisplay products={products}/>
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
