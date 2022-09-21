// Reducer focused on cart-specific functions

import { CART_ACTION_TYPES } from "./cart.types";

// Initial state for parts related to the cart
export const CART_INITIAL_STATE = {
  showCart: false,
  cartItems: [],
};

// Reducer that takes the state and an action as arguments, both of which are initialized with default values.
export const cartReducer = (state = CART_INITIAL_STATE, action = {}) => {
  // Destructure the action type and the payload (i.e. the content being delivered/returned) off of the action.
  const { type, payload } = action;
  // Goes through the different possible action types defined for the cart
  switch (type) {
    // If the action type = SET_CART_ITEMS, spread the current state and set the cartItems equal to the payload
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return { ...state, cartItems: payload };
    // if the action type = SET_IS_CART_OPEN, spread the current state and set showCart equal to the payload
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return { ...state, showCart: payload };
    // If the action is for something else (like categories or the user), just return the current state
    default:
      return state;
  }
};
