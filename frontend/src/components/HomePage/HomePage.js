import React from "react";
import classes from "./HomePage.module.css";
import Header from "./Header";
import Navigation from "./Navigation";
import MyPageRequest from "../MyPage/MyPageRequest";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className={classes.homepage}>
        <div className={classes.navigation}>
          <Navigation />
        </div>
        <main className={classes.content}>
          <MyPageRequest />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
