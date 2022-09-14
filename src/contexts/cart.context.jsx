import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToAdd.id
  );
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  } else {
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  }
};

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToRemove.id
  );
  if (existingCartItem.quantity === 1) {
    const newCartItems = cartItems.filter(
      cartItem => cartItem.id !== existingCartItem.id
    );
    return newCartItems;
  } else {
    return cartItems.map(cartItem =>
      cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
};

export const CartContext = createContext({
  showCart: false,
  setShowCart: () => {},
  cartItems: [],
  addItemToCart: () => {},
  numberOfCartItems: 0,
  setNumberOfCartItems: () => {},
});

export const CartProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);

  useEffect(() => {
    const newCartItemCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setNumberOfCartItems(newCartItemCount);
  }, [cartItems]);

  const addItemToCart = productToAdd => {
    setCartItems(addCartItem(cartItems, productToAdd));
    // setNumberOfCartItems(numberOfCartItems + 1);
  };

  const removeItemFromCart = productToRemove => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };
  const value = {
    showCart,
    setShowCart,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    numberOfCartItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
