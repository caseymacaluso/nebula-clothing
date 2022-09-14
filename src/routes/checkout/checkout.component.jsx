import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems, addItemToCart, removeItemFromCart } =
    useContext(CartContext);

  return (
    <div>
      <div>
        {cartItems.map(cartItem => (
          <div key={cartItem.id}>
            <h2>{cartItem.name}</h2>
            <br />
            <span onClick={() => removeItemFromCart(cartItem)}>- </span>
            <span>{cartItem.quantity}</span>
            <span onClick={() => addItemToCart(cartItem)}> +</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkout;
