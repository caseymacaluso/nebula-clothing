import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { CartIconContainer, CartLogo, ItemCount } from "./cart-icon.styles";
// import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

const CartIcon = () => {
  const { showCart, setShowCart, numberOfCartItems } = useContext(CartContext);

  const toggleCartDropdown = () => setShowCart(!showCart);

  return (
    <CartIconContainer onClick={toggleCartDropdown}>
      <CartLogo />
      <ItemCount>{numberOfCartItems}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
