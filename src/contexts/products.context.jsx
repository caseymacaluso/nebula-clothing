import { createContext, useEffect, useState } from "react";
import PRODUCT_DATA from "../shop-data.json";

export const ProductsContext = createContext({
  productData: [],
});

export const ProductsProvider = ({ children }) => {
  const [productData, setProductData] = useState(PRODUCT_DATA);
  const value = { productData };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
