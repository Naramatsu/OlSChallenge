import { ERROR, LOADED, LOADING } from "../../utils/constants";
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

    case COMMITS_REPORT:
      return {
        ...state,
        commitsReport: payload,
        commitsReportStatus: LOADED,
      };
    case COMMITS_REPORT_LOADING:
      return {
        ...state,
        commitsReportStatus: LOADING,
      };
    case COMMITS_REPORT_ERROR:
      return {
        ...state,
        commitsReportStatus: ERROR,
        commitsReportErrorMessage: payload,
      };

    case DELIVERIES_REPORT:
      return {
        ...state,
        deliveriesReport: payload,
        deliveriesReportStatus: LOADED,
      };
    case DELIVERIES_REPORT_LOADING:
      return {
        ...state,
        deliveriesReportStatus: LOADING,
      };
    case DELIVERIES_REPORT_ERROR:
      return {
        ...state,
        deliveriesReportStatus: ERROR,
        deliveriesReportErrorMessage: payload,
      };

    default:
      return state;
  }
};

export default reducer;
