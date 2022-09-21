/////////////////////////////////////////
// Selectors that look into the redux store state and derive information from that state.
/////////////////////////////////////////

// Simple selector to set the current user based off the state in the redux store
export const selectCurrentUser = state => state.user.currentUser;
