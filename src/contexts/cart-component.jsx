import { createContext, useEffect, useState } from "react";

export const CartToggleContext = createContext({
  showCart: false,
  setShowCart: () => {},
});

export const CartItemsContext = createContext({
  cartItems: [],
});

export const CartToggleProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const value = { showCart, setShowCart };

  return (
    <CartToggleContext.Provider value={value}>
      {children}
    </CartToggleContext.Provider>
  );
};

export const CartItemsProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const value = { cartItems };

  return (
    <CartItemsContext.Provider value={value}>
      {children}
    </CartItemsContext.Provider>
  );
};
