import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import Skeleton from "./Skeleton";

const BannerWeather = ({ banner, time, city, temp }) => {
  return (
    <section className="relative w-full h-full">
      {banner ? (
        <>
          <section className="absolute right-4 top-5 bg-white opacity-50 rounded-xl p-4">
            <h4 className="flex items-center text-2xl font-semibold">
              {time === "day" ? (
                <FiSun className="mr-1" />
              ) : (
                <FiMoon className="mr-1" />
              )}
              {temp}
              <sup className="text-sm mt-[6px]">C</sup>
            </h4>
            <p className="font-semibold">{city}</p>
          </section>
          <img
            src={banner}
            alt="banner-weather"
            className="w-full object-cover h-[400px] rounded-xl shadow-md"
          />
        </>
      ) : (
        <Skeleton height="400px" width="100%" />
      )}
    </section>
  );
};

export default BannerWeather;
