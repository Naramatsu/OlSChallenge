import React from "react";
import { FaAngleRight } from "react-icons/fa";

const SideNav = ({ tabs, onClick, activeTab }) => {
  const liClassNames = (tab) => {
    let activeTabClassName = "";
    if (tab === activeTab)
      activeTabClassName = "bg-indigo-800 text-white hover:bg-indigo-800";
    return `mt-3 w-[85%] mx-auto flex items-center justify-between rounded-md cursor-pointer hover:bg-indigo-50 p-3 ${activeTabClassName}`;
  };

  return (
    <aside className="w-[270px] pt-16 min-h-screen relative bg-white shadow-sm z-10 overflow-hidden flex-none">
      <ul className="pt-4 flex flex-col sticky top-16 h-full">
        {tabs.map(({ label, icon, tab }, index) => (
          <li
            key={index}
            className={liClassNames(tab)}
            onClick={() => onClick(tab)}
          >
            <span className="flex items-center gap-3 pt-[1px]">
              {icon}
              {label}
            </span>
            <FaAngleRight />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideNav;
