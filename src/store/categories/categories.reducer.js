// Reducer focused on categories-related operations
import { CATEGORIES_ACTION_TYPES } from "./categories.types";

// Initial state for categories as an empty array
export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: null,
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
    // If type = FETCH_CATEGORIES_START, spread over current state and set loading to true.
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return { ...state, isLoading: true };
    // If type = FETCH_CATEGORIES_SUCCESS, spread over current state and set categories to the payload.
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: payload, isLoading: false };
    // If type = FETCH_CATEGORIES_FAILED, spread over current state and set error to the payload.
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return { ...state, error: payload, isLoading: false };
    // If type is something else, just return the current state.
    default:
      return state;
  }
};
