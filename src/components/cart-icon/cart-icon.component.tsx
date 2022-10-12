import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItemCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { CartIconContainer, CartLogo, ItemCount } from "./cart-icon.styles";

const CartIcon = () => {
  const dispatch = useDispatch();
  const showCart = useSelector(selectIsCartOpen);
  const numberOfCartItems = useSelector(selectCartItemCount);

  const toggleCartDropdown = () => dispatch(setIsCartOpen(!showCart));

  return (
    <CartIconContainer onClick={toggleCartDropdown}>
      <CartLogo />
      <ItemCount>{numberOfCartItems}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
