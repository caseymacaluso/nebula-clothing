import { useContext } from "react";
import { CartToggleContext } from "../../contexts/cart-component";
import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

const CartIcon = () => {
  const { showCart, setShowCart } = useContext(CartToggleContext);

  const toggleCartDropdown = () => setShowCart(!showCart);

  return (
    <div className="cart-icon-container" onClick={toggleCartDropdown}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};

export default CartIcon;
