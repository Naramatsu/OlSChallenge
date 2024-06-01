import React from "react";

const Skeleton = ({ width = "100%", height = "100%" }) => (
  <section
    className="animate-pulse bg-slate-700 rounded-xl shadow-md relative"
    style={{ width, height }}
  />
);

export default Skeleton;
