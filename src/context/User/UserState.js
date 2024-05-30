import React, { useReducer } from "react";
import Reducer from "./reducer";
import { UserContext } from ".";
import { loginApi } from "../../api/login";
import { LOGIN, LOGIN_ERROR, LOGIN_LOADING, LOGOUT } from "./types";
import { deleteFromLocalStorage, saveInLocalStorage } from "../../utils";
import { NOT_LOADED } from "../../utils/constants";
import { userInSessionApi } from "../../api/user";

export const userInitialState = {
  user: null,
  userStatus: NOT_LOADED,
  userErrorMessage: "",
};

const UserState = ({ children }) => {
  const localStorageKeyUser = "user";
  const [globalState, dispatch] = useReducer(Reducer, userInitialState);

  const login = async ({ user, password }) => {
    dispatch({
      type: LOGIN_LOADING,
    });
    try {
      const loginData = await loginApi({ user, password });
      const data = loginData.at(0) || null;
      if (data) {
        const userList = await userInSessionApi();
        if (!userList.length) {
          dispatch({
            type: LOGIN_ERROR,
            payload: "Usuario no encontrado",
          });
          return null;
        }
        const userInfo = userList.find((user) => user.id === data.user_id);
        const payload = {
          ...data,
          ...userInfo,
        };
        dispatch({
          type: LOGIN,
          payload,
        });
        saveInLocalStorage(localStorageKeyUser, payload);
      } else {
        dispatch({
          type: LOGIN_ERROR,
          payload: "Usuario no encontrado",
        });
        saveInLocalStorage(localStorageKeyUser, data);
      }
      return data;
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
    deleteFromLocalStorage(localStorageKeyUser);
  };

  const combinedFunctions = {
    login,
    logout,
  };

  return (
    <UserContext.Provider value={{ ...globalState, ...combinedFunctions }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
