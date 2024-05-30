import React, { useContext, useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import { DashboardContext } from "../context/Dashboard";
import { NOT_LOADED, weatherBannerList } from "../utils/constants";
import LineCharts from "../components/LineCharts";

const Dashboard = ({ user }) => {
  const {
    getWeather,
    weatherInfo,
    weatherStatus,
    dashboardInfo,
    dashboardStatus,
    getDashboardInfo,
    cpuReport,
    cpuReportStatus,
    getCPUReport,
  } = useContext(DashboardContext);
  const [banner, setBanner] = useState(null);

  const projectsCount = dashboardInfo?.projects || 0;
  const projectsInProcessCount = dashboardInfo?.projects_dev || 0;
  const projectsNCCount = dashboardInfo?.peding_nc || 0;
  const projectsErrorCount = dashboardInfo?.errors_deploy || 0;

  const projectPercentaje = cpuReport?.percentaje_time || 0;
  const projectDeploys = cpuReport?.deploys || 0;
  const projectTime = cpuReport?.time || [];

  useEffect(() => {
    if (dashboardStatus === NOT_LOADED) getDashboardInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardStatus]);

  useEffect(() => {
    if (cpuReportStatus === NOT_LOADED) getCPUReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cpuReportStatus]);

  useEffect(() => {
    if (weatherStatus === NOT_LOADED) getWeather("asd");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherStatus]);

  useEffect(() => {
    if (weatherInfo?.time) {
      setBanner(
        weatherBannerList.find(({ type }) => type === weatherInfo?.weather)[
          weatherInfo.time
        ]
      );
    }
  }, [weatherInfo]);

  return (
    <article className="w-full h-full pt-16 text-left p-10">
      <h3 className="w-full mt-9 font-bold text-2xl">
        Bienvenido/a {user.name}
      </h3>
      <p className="mt-1">
        Verifica tus alertas, posees
        <span className="text-indigo-500"> 3 alertas sin leer!</span>
      </p>
      <section className="grid xl:grid-cols-2 lg:grid-cols-1 gap-6 mt-10">
        <section>
          {banner ? (
            <img
              src={banner}
              alt="banner-weather"
              className="w-full object-cover h-[400px] rounded-xl shadow-md"
            />
          ) : (
            <p>Loading...!</p>
          )}
        </section>
        <section className="grid grid-cols-2 gap-6">
          <DashboardCard
            title="Proyectos Registrados"
            count={projectsCount}
            label="Ultimo proyecto registrado hace 15 días"
            color="bg-indigo-400"
          />
          <DashboardCard
            title="Proyectos en Desarrollo"
            count={projectsInProcessCount}
            label="Total de avance 22.00%"
            color="bg-indigo-600"
          />
          <DashboardCard
            title="NC's sin resolver"
            count={projectsNCCount}
            label="Ultima NC registrada hace 1 dia"
            color="bg-indigo-500"
          />
          <DashboardCard
            title="Cantidad de Errores"
            count={projectsErrorCount}
            label="Ultimo error hace 2 horas"
            color="bg-red-400"
          />
        </section>
        <section className="w-full bg-white shadow-md rounded-xl p-6">
          <h4 className="font-semibold text-2xl">Detalles del servidor</h4>
          <p className="my-4 font-semibold">
            The total number of session wothin the range. It is the period time
            a user is actively engaged with your website, page or app, etc.
          </p>
          <section className="flex gap-6 mb-12">
            <section>
              <label className="text-gray-500">Tiempo de Uso</label>
              <p className="text-3xl font-semibold text-indigo-800 mt-1">
                {projectPercentaje}%
              </p>
            </section>
            <section>
              <label className="text-gray-500">Proyectos Desplegados</label>
              <p className="text-3xl font-semibold text-indigo-800 mt-1">
                {projectDeploys}
              </p>
            </section>
          </section>
          <LineCharts chartInfo={projectTime} />
        </section>
        <section className="">asdasdasd 1</section>
      </section>
    </article>
  );
};

export default Dashboard;
