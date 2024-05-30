import { ERROR, LOADED, LOADING } from "../../utils/constants";
import {
  GET_ALL_PROJECTS,
  GET_ALL_PROJECTS_ERROR,
  GET_ALL_PROJECTS_LOADING,
} from "./types";

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_PROJECTS:
      return {
        ...state,
        projects: payload,
        projectsStatus: LOADED,
      };
    case GET_ALL_PROJECTS_LOADING:
      return {
        ...state,
        projectsStatus: LOADING,
      };
    case GET_ALL_PROJECTS_ERROR:
      return {
        ...state,
        projectsStatus: ERROR,
        projectsMessage: payload,
      };

    default:
      return state;
  }
};

export default reducer;
