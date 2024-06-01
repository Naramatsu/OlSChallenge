import React, { useContext, useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import { DashboardContext } from "../context/Dashboard";
import { NOT_LOADED, weatherBannerList } from "../utils/constants";
import LineCharts from "../components/LineCharts";
import BarChart from "../components/BarChart";
import CardChart from "../components/CardChart";
import BannerWeather from "../components/BannerWeather";
import DoughnutChart from "../components/DoughnutChart";
import { formatDate, getRandomColor } from "../utils";

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
    commitsReport,
    commitsReportStatus,
    getCommitsReport,
    deliveriesReport,
    deliveriesReportStatus,
    getDeliveriesReport,
  } = useContext(DashboardContext);
  const [banner, setBanner] = useState(null);
  const [userPositionCoords, setUserPositionCoords] = useState(null);

  const projectsCount = dashboardInfo?.projects || 0;
  const projectsInProcessCount = dashboardInfo?.projects_dev || 0;
  const projectsNCCount = dashboardInfo?.peding_nc || 0;
  const projectsErrorCount = dashboardInfo?.errors_deploy || 0;

  const projectPercentaje = cpuReport?.percentaje_time || 0;
  const projectDeploys = cpuReport?.deploys || 0;
  const projectTime = cpuReport?.time || [];

  const projectsCommits = commitsReport || [];

  const ncStates = deliveriesReport?.nc_state || [];
  const topProjects = deliveriesReport?.top_projects || [];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { coords } = position;
        if (!coords) {
          return false;
        }
        setUserPositionCoords({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (dashboardStatus === NOT_LOADED) getDashboardInfo();
    if (cpuReportStatus === NOT_LOADED) getCPUReport();
    if (commitsReportStatus === NOT_LOADED) getCommitsReport();
    if (deliveriesReportStatus === NOT_LOADED) getDeliveriesReport();
    if (weatherStatus === NOT_LOADED && userPositionCoords)
      getWeather(userPositionCoords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dashboardStatus,
    cpuReportStatus,
    commitsReportStatus,
    deliveriesReportStatus,
    weatherStatus,
  ]);

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
        <BannerWeather
          banner={banner}
          time={weatherInfo?.time}
          city={weatherInfo?.city}
          temp={weatherInfo?.temp}
        />
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
        <CardChart
          title="Detalles del servidor"
          description="The total number of session wothin the range. It is the period time a user is actively engaged with your website, page or app, etc."
          aditionalInfo={[
            {
              label: "Tiempo de Uso",
              data: `${projectPercentaje}%`,
            },
            {
              label: "Proyectos Desplegados",
              data: projectDeploys,
            },
          ]}
          chart={<LineCharts chartInfo={projectTime} />}
        />
        <CardChart
          title="Reporte de commits"
          description="Total de commits realizados por cada mes diferenciado entre los tag de Ajustes(fix) y Caracteristicas(feat)."
          chart={<BarChart chartInfo={projectsCommits} />}
        />
        <section className="w-full bg-white shadow-md rounded-xl p-6 justify-between xl:col-span-2 lg:col-span-1 flex xl:flex-row lg:flex-col xl:max-h-[400px] gap-10">
          <section className="xl:max-w-[350px] xl:w-[33%] lg:w-full">
            <h4 className="font-semibold text-2xl">Entregas</h4>
            <h3 className="font-semibold text-5xl text-indigo-800 mt-2">%30</h3>
            {deliveriesReport?.cicle && (
              <p className="text-2xl text-indigo-800 mt-2">
                Proximo Ciclo: {formatDate(deliveriesReport?.cicle)}
              </p>
            )}
            <p className="font-sm mt-8">
              El ciclo de entrega se calcula usando las fechas estimadas de los
              Sprints en cada proyecto.
            </p>
          </section>
          <section className="lg:mt-8 lg:mb-16 flex flex-col gap-6 w-full xl:w-[33%]">
            {topProjects.map(({ name, porcentaje }, index) => (
              <section key={index} className="flex items-center gap-8">
                <p className="w-max min-w-[150px] text-slate-400">{name}</p>
                <section className="h-2 w-full bg-slate-400 rounded-md relative">
                  <span
                    style={{
                      width: `${porcentaje}%`,
                      background: getRandomColor(),
                    }}
                    className={`absolute h-full  block top-0 left-0 rounded-md`}
                  />
                </section>
                <label className="font-bold">{porcentaje}%</label>
              </section>
            ))}
          </section>
          <section className="xl:max-w-[350px] xl:w-[33%] lg:w-full lg:flex lg:justify-center">
            <DoughnutChart chartInfo={ncStates} />
          </section>
        </section>
      </section>
    </article>
  );
};

export default Dashboard;
