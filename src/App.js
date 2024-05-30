import React from "react";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import PrivateRoutes from "./hooks/PrivateRoutes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import "./App.css";

const App = () => {
  return (
    <main className="App w-full min-h-screen bg-indigo-50">
      <Switch>
        <PrivateRoutes path="/">
          <Home />
        </PrivateRoutes>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </main>
  );
};

export default App;
