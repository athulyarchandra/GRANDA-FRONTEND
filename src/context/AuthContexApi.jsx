import React, { createContext, useState } from "react";
import { loginUser } from "../services/allAPI";

export const userContext = createContext();

const AuthContextApi = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (userData) => {
    try {
      const response = await loginUser(userData);
      console.log("Login Response:", response);

      if (response.status === 200) {
        const loggedUser = response.data.user;

        if (loggedUser.status === "Inactive") {
          alert("Your account is deactivated. Please contact admin.");
          return { success: false, message: "Account inactive" };
        }

        setIsLoggedIn(true);
        setUser(loggedUser);

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(loggedUser));

        return { success: true, user: loggedUser };
      } else {
        if (response.status === 401 || response.status === 400) {
          alert(response.data);
        }

        return { success: false, message: "Invalid credentials" };
      }
    } catch (error) {
      console.log("Login error:", error);
      return { success: false, message: "Login failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <userContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </userContext.Provider>
  );
};

export default AuthContextApi;
