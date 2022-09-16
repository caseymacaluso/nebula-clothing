import {
  CheckoutItemContainer,
  ImageContainer,
  Arrow,
  Value,
  QuantityContainer,
  RemoveButton,
} from "./checkout-item.styles";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {
  const { addItemToCart, decrementItemFromCart, removeItemFromCart } =
    useContext(CartContext);
  const { imageUrl, name, price, quantity } = cartItem;

  const addItemHandler = () => addItemToCart(cartItem);
  const decrementItemHandler = () => decrementItemFromCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <span className="name">{name}</span>
      <QuantityContainer>
        <Arrow onClick={decrementItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </QuantityContainer>
      <span className="price">${price}</span>
      <RemoveButton onClick={removeItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
