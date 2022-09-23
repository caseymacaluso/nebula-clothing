// Reducer focused on user-related operations
import { USER_ACTION_TYPES } from "./user.types";

// initial state for the user
const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

// Reducer that takes the state and an action as arguments, both of which are initialized with default values.
export const userReducer = (state = INITIAL_STATE, action) => {
  // Destructures the type and payload off of the action
  const { type, payload } = action;
  // Goes through different user action types to see what to do
  switch (type) {
    // if type is SET_CURRENT_USER, spread over current state and set currentUser equal to the payload
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return { ...state, currentUser: payload };
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return { ...state, currentUser: null };
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
    case USER_ACTION_TYPES.SIGN_UP_FAILED:
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
      return { ...state, error: payload };
    default:
      return state; // with reducers, every reducer receives every action, so if a specific reducer does not receive a specific action, the current state should be returned.
  }
};
