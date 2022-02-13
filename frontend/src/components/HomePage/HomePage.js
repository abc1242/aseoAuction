import React from "react";
import classes from "./HomePage.module.css";
import Header from "./Header";
import Navigation from "./Navigation";
import Profile from "../MyPage/Profile";
import { Route } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Header />
      <div className={classes.homepage}>
        <div className={classes.navigation}>
          <Navigation />
        </div>
        <main className={classes.content}>
          <Route path="/profile">
            <Profile />
          </Route>
        </main>
      </div>
    </>
  );
};

export default HomePage;
