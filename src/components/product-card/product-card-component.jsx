import { ProductCardContainer, Footer } from "./product-card.styles.jsx";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import Button, { buttonTypeClasses } from "../button/button.component";

const ProductCard = ({ product }) => {
  const { imageUrl, name, price } = product;
  const { addItemToCart } = useContext(CartContext);
  const addProductToCart = () => addItemToCart(product);

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={name} />
      <Footer>
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </Footer>
      <Button
        buttonType={buttonTypeClasses.inverted}
        onClick={addProductToCart}>
        ADD TO CART
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
