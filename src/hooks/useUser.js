import { useState, useEffect } from "react";
import { getFromLocalStorage } from "../utils";

const useUser = () => {
  const userFromLocalStorage = getFromLocalStorage("user");

  const [user, setUser] = useState(userFromLocalStorage || null);

  useEffect(() => {
    if (!userFromLocalStorage?.id) {
      setUser(null);
    } else {
      setUser(userFromLocalStorage);
    }
  }, []);

  return user;
};

export default useUser;
