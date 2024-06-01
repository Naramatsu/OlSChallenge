import React, { useReducer } from "react";
import Reducer from "./reducer";
import { DashboardContext } from ".";
import { NOT_LOADED } from "../../utils/constants";
import {
  COMMITS_REPORT,
  COMMITS_REPORT_ERROR,
  COMMITS_REPORT_LOADING,
  CPU_REPORT,
  CPU_REPORT_ERROR,
  CPU_REPORT_LOADING,
  DASHBOARD,
  DASHBOARD_ERROR,
  DASHBOARD_LOADING,
  DELIVERIES_REPORT,
  DELIVERIES_REPORT_ERROR,
  DELIVERIES_REPORT_LOADING,
  WEATHER,
  WEATHER_ERROR,
  WEATHER_LOADING,
} from "./types";
import {
  getCPUReportApi,
  getCommitsReportApi,
  getDashboardApi,
  getDeliveriesReportApi,
  getWeatherApi,
} from "../../api/dashboard";
import { isDayOrNight } from "../../utils";

const DashboardState = ({ children }) => {
  const initialState = {
    dashboardInfo: null,
    dashboardStatus: NOT_LOADED,
    dashboardErrorMessage: "",
    weatherInfo: null,
    weatherStatus: NOT_LOADED,
    weatherErrorMessage: "",
    cpuReport: null,
    cpuReportStatus: NOT_LOADED,
    cpuReportErrorMessage: "",
    commitsReport: null,
    commitsReportStatus: NOT_LOADED,
    commitsReportErrorMessage: "",
    deliveriesReport: null,
    deliveriesReportStatus: NOT_LOADED,
    deliveriesReportErrorMessage: "",
  };
  const [globalState, dispatch] = useReducer(Reducer, initialState);

  const getDashboardInfo = async () => {
    dispatch({
      type: DASHBOARD_LOADING,
    });
    try {
      const data = await getDashboardApi();
      if (!data) return null;

      dispatch({
        type: DASHBOARD,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DASHBOARD_ERROR,
        payload: error.message,
      });
    }
  };

  const getCPUReport = async () => {
    dispatch({
      type: CPU_REPORT_LOADING,
    });
    try {
      const data = await getCPUReportApi();
      if (!data) return null;

      dispatch({
        type: CPU_REPORT,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CPU_REPORT_ERROR,
        payload: error.message,
      });
    }
  };

  const getCommitsReport = async () => {
    dispatch({
      type: COMMITS_REPORT_LOADING,
    });
    try {
      const data = await getCommitsReportApi();
      if (!data) return null;

      dispatch({
        type: COMMITS_REPORT,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: COMMITS_REPORT_ERROR,
        payload: error.message,
      });
    }
  };

  const getDeliveriesReport = async () => {
    dispatch({
      type: DELIVERIES_REPORT_LOADING,
    });
    try {
      const data = await getDeliveriesReportApi();
      if (!data) return null;

      dispatch({
        type: DELIVERIES_REPORT,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELIVERIES_REPORT_ERROR,
        payload: error.message,
      });
    }
  };

  const getWeather = async ({ latitude, longitude }) => {
    dispatch({
      type: WEATHER_LOADING,
    });
    try {
      const data = await getWeatherApi({ latitude, longitude });
      if (!data) return null;
      const { name, main, weather } = data;

      const payload = {
        city: name,
        time: isDayOrNight(),
        temp: main.temp,
        weather: weather[0].main,
      };

      dispatch({
        type: WEATHER,
        payload,
      });
    } catch (error) {
      dispatch({
        type: WEATHER_ERROR,
        payload: error.message,
      });
    }
  };

  const combinedFunctions = {
    getDashboardInfo,
    getCPUReport,
    getCommitsReport,
    getDeliveriesReport,
    getWeather,
  };

  return (
    <DashboardContext.Provider value={{ ...globalState, ...combinedFunctions }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardState;
