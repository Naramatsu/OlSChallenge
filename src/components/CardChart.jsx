import React from "react";

const CardChart = ({ title, description, aditionalInfo = null, chart }) => {
  return (
    <section className="w-full bg-white shadow-md rounded-xl p-6 flex flex-col justify-between">
      <section>
        <h4 className="font-semibold text-2xl">{title}</h4>
        <p className="my-4 font-semibold">{description}</p>
        {aditionalInfo && (
          <section className="flex gap-6 mb-12">
            {aditionalInfo.map(({ label, data }, index) => (
              <section key={index}>
                <label className="text-gray-500">{label}</label>
                <p className="text-3xl font-semibold text-indigo-800 mt-1">
                  {data}
                </p>
              </section>
            ))}
          </section>
        )}
      </section>
      {chart}
    </section>
  );
};

export default CardChart;
