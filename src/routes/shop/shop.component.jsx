// import SHOP_DATA from "../../shop-data.json";
import { Route, Routes } from "react-router-dom";
import CategoriesPreview from "../../routes/categories-preview/categories-preview.component";
import "./shop.styles.scss";

const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
    </Routes>
  );
};

export default Shop;
