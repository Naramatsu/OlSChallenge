import React, { useMemo } from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const options = {
  responsive: true,
  display: false,
  animation: true,
  scales: {
    y: {
      grid: {
        display: false,
      },
      ticks: {
        min: 0,
        max: 100,
        stepSize: 10,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const LineCharts = ({ chartInfo }) => {
  const scores = chartInfo.map((info) => info.value);
  const labels = chartInfo.map((info) => info.time);

  const data = useMemo(() => {
    return {
      datasets: [
        {
          label: "",
          data: scores,
          tension: 0.4,
          borderColor: "#4f46e5",
        },
      ],
      labels,
    };
  }, [scores, labels]);

  return <Line data={data} options={options} />;
};

export default LineCharts;
