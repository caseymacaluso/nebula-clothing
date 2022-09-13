// import SHOP_DATA from "../../shop-data.json";
import { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";
import ProductCard from "../product-card/product-card-component";
import "./shop.styles.scss";

const Shop = () => {
  const { productData } = useContext(ProductsContext);
  return (
    <div className="products-container">
      {productData.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Shop;
