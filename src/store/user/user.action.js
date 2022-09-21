// ACTION functions related to users
import { USER_ACTION_TYPES } from "./user.types";
import { createAction } from "../../utils/reducer/reducer.utils";

// Function to set the current user. uses the createAction helper function and creates an object with a type and the user as the payload
export const setCurrentUser = user => {
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
};
