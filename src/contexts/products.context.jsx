import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
// import PRODUCT_DATA from "../shop-data.json";
// import SHOP_DATA from "../shop-data";

export const ProductsContext = createContext({
  productData: [],
});

export const ProductsProvider = ({ children }) => {
  const [productData, setProductData] = useState([]);

  // Done as a one-off to populate the database on Firebase
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);

  useEffect(() => {
    const getCategoryMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      console.log(categoryMap);
    };
    getCategoryMap();
  }, []);

  const value = { productData };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
