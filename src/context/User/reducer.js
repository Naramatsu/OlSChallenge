import { ERROR, LOADED, LOADING } from "../../utils/constants";
import { userInitialState } from "./UserState";
import { LOGIN, LOGIN_ERROR, LOGIN_LOADING, LOGOUT } from "./types";

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return {
        ...state,
        user: payload,
        userStatus: LOADED,
        userErrorMessage: "",
      };
    case LOGIN_LOADING:
      return {
        ...state,
        userStatus: LOADING,
        userErrorMessage: "",
      };
    case LOGIN_ERROR:
      return {
        ...state,
        userStatus: ERROR,
        userErrorMessage: payload,
      };
    case LOGOUT:
      return {
        ...state,
        ...userInitialState,
      };
    default:
      return state;
  }
};

export default reducer;
