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

const decrementCartItem = (cartItems, productToDecrement) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToDecrement.id
  );
  if (existingCartItem.quantity === 1) {
    const newCartItems = cartItems.filter(
      cartItem => cartItem.id !== existingCartItem.id
    );
    return newCartItems;
  } else {
    return cartItems.map(cartItem =>
      cartItem.id === productToDecrement.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
};

const removeCartItem = (cartItems, productToRemove) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToRemove.id
  );
  return cartItems.filter(cartItem => cartItem.id !== existingCartItem.id);
};

export const CartContext = createContext({
  showCart: false,
  setShowCart: () => {},
  cartItems: [],
  addItemToCart: () => {},
  decrementItemFromCart: () => {},
  removeItemFromCart: () => {},
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
  };

  const decrementItemFromCart = productToDecrement => {
    setCartItems(decrementCartItem(cartItems, productToDecrement));
  };

  const removeItemFromCart = productToRemove => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const value = {
    showCart,
    setShowCart,
    cartItems,
    addItemToCart,
    decrementItemFromCart,
    removeItemFromCart,
    numberOfCartItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
