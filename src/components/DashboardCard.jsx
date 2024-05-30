import React from "react";

const DashboardCard = ({ title, count, label, color }) => {
  return (
    <section
      className={`w-full ${color} rounded-xl flex flex-col justify-center p-6 text-white shadow-md`}
    >
      <h5 className="text-lg">{title}</h5>
      <h4 className="mt-2 text-3xl">{count}</h4>
      <label className="text-sm mt-1">{label}</label>
    </section>
  );
};

export default DashboardCard;
