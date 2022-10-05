import { CategoryItem } from "../categories/categories.types";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload,
} from "../../utils/reducer/reducer.utils";

////////////////////////////////
// HELPER FUNCTIONS. called further down to create new arrays of cart items
////////////////////////////////

// Function to add an item to the cart. Creates and returns a new array of cart items
const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  // Checks to see if the item being added to the cart already exists in the cart
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToAdd.id
  );

  // If item being added already exists in the cart, map over cart items. If current cart item being mapped over = item being added, increment the quantity by 1. Otherwise, return the current item.
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    // If item being added does not exist in the cart, return an array that includes the existing cart items and the new product, appending a quantity of 1 to that item
  } else {
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  }
};

// Function to decrement an item from the cart (i.e. lower the quantity by 1). Creates and returns a new array of cart items
const decrementCartItem = (
  cartItems: CartItem[],
  productToDecrement: CategoryItem
): CartItem[] => {
  // Checks to see if the item being decremented from the cart already exists in the cart
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToDecrement.id
  );

  // if the item being removed has a quantity of 1, return an array that filters out the removed item.
  if (existingCartItem && existingCartItem.quantity === 1) {
    const newCartItems = cartItems.filter(
      cartItem => cartItem.id !== existingCartItem.id
    );
    return newCartItems;

    // If item being removed does not have a quantity of 1, map over cart items. if current mapped item = item being decremented, lower quantity by 1. Otherwise, return the current item.
  } else {
    return cartItems.map(cartItem =>
      cartItem.id === productToDecrement.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
};

// Function to remove an item from the cart, regardless of quantity. Returns a filtered array of cart items.
const removeCartItem = (
  cartItems: CartItem[],
  productToRemove: CategoryItem
): CartItem[] => {
  // Return a filtered array of cart items, where the productToRemove is removed from the cart.
  return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
};

///////////////////////////////////////////
// ACTION FUNCTIONS. Functions to call at the component level that change the state
///////////////////////////////////////////

export type SetIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;
export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

// Calls the addCartItem helper function. Returns an object with an action type and the new cart items as the payload
export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): SetCartItems => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

// Calls the decrementCartItem helper function. Returns an object with an action type and the new cart items as the payload
export const decrementItemFromCart = (
  cartItems: CartItem[],
  productToDecrement: CategoryItem
): SetCartItems => {
  const newCartItems = decrementCartItem(cartItems, productToDecrement);
  return setCartItems(newCartItems);
};

// Calls the removeCartItem helper function. Returns an object with an action type and the new cart items as the payload
export const removeItemFromCart = (
  cartItems: CartItem[],
  productToRemove: CategoryItem
): SetCartItems => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return setCartItems(newCartItems);
};

// Returns an object with an action type and a true/false value as the payload
export const setIsCartOpen = withMatcher(
  (boolean: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
);
