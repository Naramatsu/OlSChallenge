import React, { useMemo } from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { months } from "../utils";

ChartJs.register(
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
  responsive: true,
  animation: true,
  scales: {
    y: {
      ticks: {
        min: 0,
        max: 300,
        stepSize: 50,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

const BarChart = ({ chartInfo }) => {
  const fixes = chartInfo.map((info) => info.fix);
  const feat = chartInfo.map((info) => info.feat);
  const labels = chartInfo.map((info) => months[info.month + 1]);

  const data = useMemo(() => {
    return {
      datasets: [
        {
          label: "Feat",
          data: fixes,
          tension: 0.4,
          backgroundColor: "#97bdfe",
        },
        {
          label: "Fix",
          data: feat,
          tension: 0.4,
          backgroundColor: "#4c4aad",
        },
      ],
      labels,
    };
  }, [fixes, feat, labels]);

  return <Bar data={data} options={options} />;
};

export default BarChart;
