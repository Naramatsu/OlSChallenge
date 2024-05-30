import React from "react";
import { CiBellOn, CiMenuKebab } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = ({ imgAvatar }) => {
  return (
    <header className="fixed w-full top-0 h-16 bg-white shadow-md px-5 z-20">
      <nav className="h-full w-full flex justify-between">
        <section className="w-[250px] flex items-center justify-between">
          <img src="logo2.png" alt="logo" className="w-20 h-12" />
          <GiHamburgerMenu className="cursor-pointer text-2xl" />
        </section>
        <section className="text-2xl flex gap-4 items-center">
          <section className="relative cursor-pointer">
            <CiBellOn />
            <span className="absolute top-0 right-0 flex  h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
          </section>
          <img
            className="inline-block h-8 w-8 rounded-full ring-2 ring-white scale-100 cursor-default"
            src={imgAvatar}
            alt=""
          />
          <CiMenuKebab className="rotate-90 cursor-pointer" />
        </section>
      </nav>
    </header>
  );
};

export default Header;
