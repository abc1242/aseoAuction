import React from "react";
import { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.js";
import LandingPage from "./components/LandingPage/LandingPage.js";
import Login from "./components/UserAuth/Login/Login";
import Signup from "./components/UserAuth/Signup/Signup";
import AuthContext from "./store/auth-context";
import { ContentContextProvider } from "./store/content-context.js";
import RequestPassword from "./components/UserAuth/RequestPassword.js";
import Alert from "@mui/material/Alert";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Switch>
      <Route path="/login">
        {authCtx.isLoggedIn ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path="/signup">
        {authCtx.isLoggedIn ? <Redirect to="/" /> : <Signup />}
      </Route>
      <Route path="/password">
        {authCtx.isLoggedIn ? <Redirect to="/" /> : <RequestPassword />}
      </Route>
      <Route path="/">
        <ContentContextProvider>
          {authCtx.isLoggedIn ? <HomePage /> : <LandingPage />}
        </ContentContextProvider>
      </Route>
    </Switch>
  );
}

export default App;
