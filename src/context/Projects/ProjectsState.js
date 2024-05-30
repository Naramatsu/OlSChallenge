import React, { useReducer } from "react";
import Reducer from "./reducer";
import { ProjectsContext } from ".";
import { NOT_LOADED } from "../../utils/constants";
import {
  GET_ALL_PROJECTS,
  GET_ALL_PROJECTS_ERROR,
  GET_ALL_PROJECTS_LOADING,
} from "./types";
import { getAllProjectsApi } from "../../api/projects";

const ProjectsState = ({ children }) => {
  const initialState = {
    projects: [],
    projectsStatus: NOT_LOADED,
    projectsMessage: "",
  };
  const [globalState, dispatch] = useReducer(Reducer, initialState);

  const getAllProjects = async () => {
    dispatch({
      type: GET_ALL_PROJECTS_LOADING,
    });
    try {
      const data = await getAllProjectsApi();
      dispatch({
        type: GET_ALL_PROJECTS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_PROJECTS_ERROR,
        payload: error.message,
      });
    }
  };

  const combinedFunctions = {
    getAllProjects,
  };

  return (
    <ProjectsContext.Provider value={{ ...globalState, ...combinedFunctions }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsState;
