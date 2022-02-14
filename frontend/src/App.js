import React from "react";
import { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.js";
import LandingPage from "./components/LandingPage/LandingPage.js";
import Login from "./components/UserAuth/Login/Login";
import Signup from "./components/UserAuth/Signup/Signup";
import AuthContext from "./store/auth-context";
import { ContentContextProvider } from "./store/content-context.js";





function App() {
  const authCtx = useContext(AuthContext);

  return (
<<<<<<< HEAD
    <AuthContext.Provider
      value={{
        token: token,
        userEmail: userEmail,
        setToken: setToken,
        setUserEmail: setUserEmail,
      }}
    >
      <Switch>
        <Route path="/" exact>
          {/* {token ? <HomePage /> : <Redirect to="/landingpage" />} */}
          {/* <LandingPage /> */}
          <HomeGroupMeeting />
        </Route>
        <Route path="/landingpage">
          <LandingPage />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
      </Switch>
    </AuthContext.Provider>
=======
    <Switch>
      <Route path="/login">
        {authCtx.isLoggedIn ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path="/signup">
        {authCtx.isLoggedIn ? <Redirect to="/" /> : <Signup />}
      </Route>
      <Route path="/">
        <ContentContextProvider>
          {authCtx.isLoggedIn ? <HomePage /> : <LandingPage />}
        </ContentContextProvider>
      </Route>
    </Switch>
>>>>>>> fb228d175a01203886cb3a932b044251fb2e228e
  );
}

export default App;
