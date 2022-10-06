/////////////////////////////////////////
// Selectors that look into the redux store state and derive information from that state.
/////////////////////////////////////////
import { createSelector } from "reselect";
import { UserState } from "./user.reducer";

export const selectUserReducer = (state): UserState => state.user;

// Simple selector to set the current user based off the state in the redux store
export const selectCurrentUser = createSelector(
  selectUserReducer,
  user => user.currentUser
);
