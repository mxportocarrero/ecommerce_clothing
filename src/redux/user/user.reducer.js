import { userActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
};

// state actually represents previous state.
// it will always show the state before actions was triggered
// we must return a new object for every action
// if we dont, react might not update reducer States
// that is why default return the same object, because we donot need to update any reducer state
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
