import React, { useState } from "react";
import Header from "../components/Header";
import useUser from "../hooks/useUser";
import SideNav from "../components/SideNav";
import Dashboard from "./Dashboard";
import DashboardState from "../context/Dashboard/DashboardState";

import { RxDashboard } from "react-icons/rx";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { RiFullscreenFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { Route, Switch, useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

const tabs = [
  {
    icon: <RxDashboard className="text-lg" />,
    label: "Dashboard",
    tab: "dashboard",
  },
  {
    icon: <MdOutlineSpaceDashboard className="text-lg" />,
    label: "Proyectos",
    tab: "proyectos",
  },
  {
    icon: <FaRegUser className="text-lg" />,
    label: "Usuarios",
    tab: "usuarios",
  },
  {
    icon: <RiFullscreenFill className="text-lg" />,
    label: "Roles",
    tab: "roles",
  },
];

const Home = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const user = useUser();
  const history = useHistory();

  const handlerChangeTab = (tab) => {
    setActiveTab(tab);
    history.push(`/${tab}`);
  };

  return (
    <section className="home min-h-screen relative">
      <Header imgAvatar={user.url_photo} />
      <section className="flex">
        <SideNav tabs={tabs} onClick={handlerChangeTab} activeTab={activeTab} />
        <Switch>
          <Route path="/dashboard">
            <DashboardState>
              <Dashboard user={user} />
            </DashboardState>
          </Route>
          <Route path="/proyectos">
            <h3 className="w-full mt-16">Hello from proyectos </h3>
          </Route>
          <Route path="/usuarios">
            <h3 className="w-full mt-16">Hello from usuarios</h3>
          </Route>
          <Route path="/roles">
            <h3 className="w-full mt-16">Hello from roles</h3>
          </Route>
        </Switch>
        <Redirect from="/" to="/dashboard" />
      </section>
    </section>
  );
};

export default Home;
