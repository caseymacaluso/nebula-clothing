/////////////////////////////////////////
// Selectors that look into the redux store state and derive information from that state.
/////////////////////////////////////////
import { createSelector } from "reselect";
import { RootState } from "../store";
import { UserState } from "./user.reducer";

export const selectUserReducer = (state: RootState): UserState => state.user;

// Simple selector to set the current user based off the state in the redux store
export const selectCurrentUser = createSelector(
  selectUserReducer,
  user => user.currentUser
);
