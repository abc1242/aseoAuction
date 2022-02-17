import React, { useState, createContext } from "react";

const AuthContext = createContext({
  token: null,
  email: null,
  nickname: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialEmail = localStorage.getItem("email");
  const initialNickname = localStorage.getItem("nickname");
  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);
  const [nickname, setNickname] = useState(initialNickname);

  const userIsLoggedIn = !!token;

  const loginHandler = (loginInfo) => {
    setToken(loginInfo.token);
    setEmail(loginInfo.email);
    setNickname(loginInfo.nickname);
    localStorage.setItem("token", loginInfo.token);
    localStorage.setItem("email", loginInfo.email);
    localStorage.setItem("nickname", loginInfo.nickname);
  };

  const logoutHandler = () => {
    setToken(null);
    setNickname(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("nickname");
    localStorage.removeItem("email");

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
    nickname: nickname,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
