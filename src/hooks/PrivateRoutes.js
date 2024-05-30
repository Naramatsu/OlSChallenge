import React from "react";
import useUser from "./useUser";
import { Redirect, Route } from "react-router-dom";

const PrivateRoutes = (props) => {
  const user = useUser();
  if (!user) return <Redirect to="/login" />;
  return <Route {...props} />;
};

export default PrivateRoutes;
