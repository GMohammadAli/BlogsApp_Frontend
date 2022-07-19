import React, { createContext, useState , useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    loginUser()
  }, [])

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
        token: token,
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
