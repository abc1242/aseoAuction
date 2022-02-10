import React from "react";

export const AuthContext = React.createContext({
  token: null,
  userEmail: "fuck",
  setToken: null,
  setUserEmail: null,
});
