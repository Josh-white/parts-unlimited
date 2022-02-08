import React, {FormEvent, useState} from "react";
import {createProduct, getProducts} from "../productsApiClient";

type ProductCreatorProps = {
  refresh: () => void
}

export const ProductCreator = ({refresh}: ProductCreatorProps) => {
  const [productName, setProductName] = useState<string>("");

  const setProductNameFromInput = (event: FormEvent<HTMLInputElement>) => {
    setProductName(event.currentTarget.value);
  };

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    createProduct(productName).then(() => refresh());
  };
  return (

    <form onSubmit={submitForm}>
      <br/>
      <label>
        Product to add
        <input name="product" type="text" onChange={setProductNameFromInput}/>
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}
