import { createContext, useReducer /* , useEffect, useState */ } from "react";

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
  cartItemCount: 0,
  cartTotal: 0,
  // numberOfCartItems: 0,
  // setNumberOfCartItems: () => {},
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, ...payload };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, showCart: payload };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

const INITIAL_STATE = {
  showCart: false,
  cartItems: [],
  numberOfCartItems: 0,
  cartTotal: 0,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { showCart, cartItems, numberOfCartItems, cartTotal } = state;
  // const [showCart, setShowCart] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [numberOfCartItems, setNumberOfCartItems] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);

  // useEffect(() => {
  //   const newCartItemCount = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity,
  //     0
  //   );
  //   setNumberOfCartItems(newCartItemCount);
  // }, [cartItems]);

  // useEffect(() => {
  //   const newCartTotal = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity * cartItem.price,
  //     0
  //   );
  //   setCartTotal(newCartTotal);
  // }, [cartItems]);

  // const cartItemCount = cartItems.reduce(
  //   (total, cartItem) => total + cartItem.quantity,
  //   0
  // );
  // const cartTotal = cartItems.reduce(
  //   (total, cartItem) => total + cartItem.quantity * cartItem.price,
  //   0
  // );

  const updateCartItemsReducer = newCartItems => {
    const newCartItemCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        numberOfCartItems: newCartItemCount,
        cartTotal: newCartTotal,
      },
    });
  };

  const addItemToCart = productToAdd => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const decrementItemFromCart = productToDecrement => {
    const newCartItems = decrementCartItem(cartItems, productToDecrement);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = productToRemove => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const setShowCart = bool => {
    dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool });
  };

  const value = {
    showCart,
    setShowCart,
    cartItems,
    addItemToCart,
    decrementItemFromCart,
    removeItemFromCart,
    numberOfCartItems,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
