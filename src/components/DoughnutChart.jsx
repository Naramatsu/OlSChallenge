import React, { useMemo } from "react";
import ChartJs from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJs.register(CategoryScale);

const options = {
  responsive: true,
  animation: true,
  plugins: {
    labels: {
      render: "value",
      fontSize: 12,
      fontColor: "#000",
      arc: true,
      position: "default",
      showActualPercentages: true,
    },
    legend: {
      position: "bottom",
      align: "center",
      labels: {
        usePointStyle: true,
      },
    },
  },
};

const DoughnutChart = ({ chartInfo }) => {
  const labels = Object.keys(chartInfo).map((keys) => keys);
  const values = Object.values(chartInfo).map((value) => value);
  const data = useMemo(() => {
    return {
      datasets: [
        {
          label: "",
          data: values,
          backgroundColor: ["#4c4aad", "#268aff", "#14921d"],
        },
      ],
      labels,
    };
  }, [values, labels]);

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
