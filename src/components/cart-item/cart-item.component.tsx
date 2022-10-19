import { FC, memo } from "react";
import { CartItemContainer, ItemDetails, Name } from "./cart-item.styles";
import { CartItem as CartItemType } from "../../store/cart/cart.types";

type CartItemProps = {
  cartItem: CartItemType;
};

const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
  const { imageUrl, name, quantity, price } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <Name>{name}</Name>
        <span>
          {quantity} X ${price} = <strong>${quantity * price}</strong>
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
});

export default CartItem;
