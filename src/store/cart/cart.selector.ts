/////////////////////////////////////////
// Selectors that look into the redux store state and derive information from that state.
/////////////////////////////////////////
import { createSelector } from "reselect";
import { RootState } from "../store";
import { CartState } from "./cart.reducer";

// Gets the cart portion of the redux store state
const selectCartReducer = (state: RootState): CartState => state.cart;

// Selector that looks at the cart state and selects the cartItems from that state.
export const selectCartItems = createSelector(
  [selectCartReducer],
  cart => cart.cartItems
);

// Selector that looks at the cart state and selects the showCart boolean from that state.
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  cart => cart.showCart
);

// Selector that takes the selectCartItems selector and derives the total number of items in the cart
export const selectCartItemCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

// Selector that takes the selectCartItems selector and derives the price total for the cart.
export const selectCartTotal = createSelector([selectCartItems], cartItems =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);
