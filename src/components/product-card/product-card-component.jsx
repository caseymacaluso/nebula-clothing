import { ProductCardContainer, Footer } from "./product-card.styles.jsx";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector.js";
import { addItemToCart } from "../../store/cart/cart.action.js";
import Button, { buttonTypeClasses } from "../button/button.component";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { imageUrl, name, price } = product;
  const cartItems = useSelector(selectCartItems);
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

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
