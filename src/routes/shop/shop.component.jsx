import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { fetchCategoriesStart } from "../../store/categories/categories.action";
import CategoriesPreview from "../../routes/categories-preview/categories-preview.component";
import Category from "../category/category.component";
import "./shop.styles.scss";

const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // The saga is listening for the FETCH_CATEGORIES_START action, so we use fetchCategoriesStart instead of using the fetchCategoriesAsync used with thunks
    dispatch(fetchCategoriesStart());
  });
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
