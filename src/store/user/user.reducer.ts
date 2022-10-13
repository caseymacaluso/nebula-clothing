// Reducer focused on user-related operations
// import { USER_ACTION_TYPES } from "./user.types";
import { AnyAction } from "redux";
import {
  signInFailed,
  signOutFailed,
  signUpFailed,
  signInSuccess,
  signOutSuccess,
} from "./user.action";
import { UserData } from "../../utils/firebase/firebase.utils";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: Boolean;
  readonly error: Error | null;
};

// initial state for the user
export const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

// Reducer that takes the state and an action as arguments, both of which are initialized with default values.
export const userReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): UserState => {
  if (signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload };
  }
  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }
  if (
    signInFailed.match(action) ||
    signOutFailed.match(action) ||
    signUpFailed.match(action)
  ) {
    return { ...state, error: action.payload };
  }
  return state;

  // Destructures the type and payload off of the action
  // const { type, payload } = action;
  // // Goes through different user action types to see what to do
  // switch (type) {
  //   // if type is SET_CURRENT_USER, spread over current state and set currentUser equal to the payload
  //   case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
  //     return { ...state, currentUser: payload };
  //   case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
  //     return { ...state, currentUser: null };
  //   case USER_ACTION_TYPES.SIGN_IN_FAILED:
  //   case USER_ACTION_TYPES.SIGN_UP_FAILED:
  //   case USER_ACTION_TYPES.SIGN_OUT_FAILED:
  //     return { ...state, error: payload };
  //   default:
  //     return state; // with reducers, every reducer receives every action, so if a specific reducer does not receive a specific action, the current state should be returned.
};
