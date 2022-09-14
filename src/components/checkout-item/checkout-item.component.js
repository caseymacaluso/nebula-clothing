import "./checkout-item.styles.scss";
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
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <div className="quantity">
        <span className="arrow" onClick={decrementItemHandler}>
          &#10094;
        </span>
        <span className="value">{quantity}</span>
        <span className="arrow" onClick={addItemHandler}>
          &#10095;
        </span>
      </div>
      <span className="price">${price}</span>
      <span className="remove-button" onClick={removeItemHandler}>
        &#10005;
      </span>
    </div>
  );
};

export default CheckoutItem;
