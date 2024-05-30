import { ERROR, LOADED, LOADING } from "../../utils/constants";
import {
  CPU_REPORT,
  CPU_REPORT_ERROR,
  CPU_REPORT_LOADING,
  DASHBOARD,
  DASHBOARD_ERROR,
  DASHBOARD_LOADING,
  WEATHER,
  WEATHER_ERROR,
  WEATHER_LOADING,
} from "./types";

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case WEATHER:
      return {
        ...state,
        weatherInfo: payload,
        weatherStatus: LOADED,
      };
    case WEATHER_LOADING:
      return {
        ...state,
        weatherStatus: LOADING,
      };
    case WEATHER_ERROR:
      return {
        ...state,
        weatherStatus: ERROR,
        weatherErrorMessage: payload,
      };

    case DASHBOARD:
      return {
        ...state,
        dashboardInfo: payload,
        dashboardStatus: LOADED,
      };
    case DASHBOARD_LOADING:
      return {
        ...state,
        dashboardStatus: LOADING,
      };
    case DASHBOARD_ERROR:
      return {
        ...state,
        dashboardStatus: ERROR,
        dashboardErrorMessage: payload,
      };

    case CPU_REPORT:
      return {
        ...state,
        cpuReport: payload,
        cpuReportStatus: LOADED,
      };
    case CPU_REPORT_LOADING:
      return {
        ...state,
        cpuReportStatus: LOADING,
      };
    case CPU_REPORT_ERROR:
      return {
        ...state,
        cpuReportStatus: ERROR,
        cpuReportErrorMessage: payload,
      };

    default:
      return state;
  }
};

export default reducer;
