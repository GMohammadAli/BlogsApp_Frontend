import React, { createContext, useState } from "react";
import axios from "axios";
import { useLocalStorage } from "../Hooks/useLocalStorage";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("user",{});
  const [users ,setUsers] = useState([])
  const [token, setToken] = useLocalStorage("token", "");
  const headers = {
    Authorization: token,
    "Content-Type": "application/json",
  };
  
  const [isAuth, setIsAuth] = useState(() => {
    if( user != null && token !== ""){
      return true
    }else {
      return false
    }
  });

  const registerUser = async (user) => {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/users`, user)
      .then((response) => {
        setUser(response.data.user);
        setToken(response.data.token);
        setIsAuth(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginUser = async (user) => {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, user)
      .then((response) => {
        setUser(response.data.user);
        setToken(response.data.token);
        setIsAuth(true);
      })
      .catch((err) => {
        console.log(err);
        setIsAuth(false);
      });
  };

  const getUsers = async () => {
    await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/`, {headers})
    .then(response => {
        setUsers(response.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const logout = () => {
    setIsAuth(false);
    setUser({});
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        user: user,
        users :users,
        token: token,
        getUsers :getUsers,
        registerUser: registerUser,
        loginUser: loginUser,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
export { AuthContext };
