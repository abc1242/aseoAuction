import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage.js";
import LandingPage from "./components/LandingPage/LandingPage.js";
import Login from "./components/UserAuth/Login/Login";
import Signup from "./components/UserAuth/Signup/Signup";
import Room from "./components/RoomPage/Room";
import { AuthContext } from "./store/auth-context.js";
import HomeGroupMeeting from "./components/HomePage/HomeGroupMeeting.js";





function App() {
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  console.log(token);

  return (
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
  );
}

export default App;
