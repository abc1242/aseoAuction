import React, { useState, createContext } from "react";

const AuthContext = createContext({
  token: null,
  email: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialEmail = localStorage.getItem("email");
  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);

  const userIsLoggedIn = !!token;

  const loginHandler = (loginInfo) => {
    setToken(loginInfo.token);
    setEmail(loginInfo.email);
    localStorage.setItem("token", loginInfo.token);
    localStorage.setItem("email", loginInfo.email);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");

    fetch("http://localhost:8080/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => console.log(error));
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    email: email,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
