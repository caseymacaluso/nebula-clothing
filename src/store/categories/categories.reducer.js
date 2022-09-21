// Reducer focused on categories-related operations
import { CATEGORIES_ACTION_TYPES } from "./categories.types";

// Initial state for categories as an empty array
export const CATEGORIES_INITIAL_STATE = {
  categories: [],
};

// Reducer that takes the state and an action as arguments, both of which are initialized with default values.
export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {}
) => {
  // Destructures the action type and payload off of the action
  const { type, payload } = action;
  // Goes through the different action types for categories
  switch (type) {
    // If type = SET_CATEGORIES, spread over current state and set categories equal to the payload
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
      return { ...state, categories: payload };
    // If type is something else, just return the current state.
    default:
      return state;
  }
};
