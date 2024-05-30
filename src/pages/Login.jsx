import React, { useState, useContext, useEffect } from "react";
import Input from "../components/Input";
import { Link, useHistory } from "react-router-dom";
import { LOADING } from "../utils/constants";
import { UserContext } from "../context/User";

const loginFormInitialState = {
  user: "",
  password: "",
};

const Login = () => {
  const { login, logout, userStatus } = useContext(UserContext);
  const [loginForm, setLoginForm] = useState(loginFormInitialState);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  useEffect(() => {
    logout();
  }, []);

  useEffect(() => {
    setIsLoading(userStatus === LOADING);
  }, [userStatus]);

  const handlerFieldChange = (event) => {
    const { value, name } = event.target;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlerSubmit = async (event) => {
    event.preventDefault();
    const user = await login(loginForm);
    if (!user) {
      setErrorMessage(
        "Usuario o contraseña incorrecta, por favor intente nuevamente"
      );
    } else {
      history.push("/");
    }
  };

  return (
    <article className="w-full min-h-screen bg-indigo-50 relative flex">
      <section className="rounded-sm p-8 m-auto w-[500px] bg-white shadow-sm text-left">
        <img src="logo.png" alt="logo" className="w-24 h-24 mt-4" />
        <h3 className="font-semibold text-lg">
          Bienvenido al gestor de proyectos!
        </h3>
        <p className="text-slate-500">Necesitamos de tu usuario y contraseña</p>
        <form onSubmit={handlerSubmit} className="flex flex-col gap-3 mt-3">
          <Input
            type="text"
            label="Usuario"
            placeholder="Nombre de usuario Ej: nombre.apellido"
            name="user"
            value={loginForm.user}
            onChange={handlerFieldChange}
          />
          <Input
            type="password"
            label="Contraseña"
            placeholder="Aquí va tu contraseña"
            name="password"
            value={loginForm.password}
            onChange={handlerFieldChange}
          />
          {errorMessage && (
            <p className="text-red-500  relative">{errorMessage}</p>
          )}
          <Input
            type="submit"
            value="Ingresar"
            color="bg-indigo-900"
            colorHover="bg-indigo-800"
            isLoading={isLoading}
          />
          <section className="flex text-sm justify-between pt-2">
            <label className="text-slate-400 flex gap-2 cursor-pointer">
              <input type="checkbox" />
              Permanecer Contectado
            </label>
            <Link to="/">Recuperar Contraseña</Link>
          </section>
        </form>
      </section>
    </article>
  );
};

export default Login;
