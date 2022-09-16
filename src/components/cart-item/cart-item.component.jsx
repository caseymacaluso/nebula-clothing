import { CartItemContainer, ItemDetails, Name } from "./cart-item.styles";

const CartItem = ({ cartItem }) => {
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
};

export default CartItem;
