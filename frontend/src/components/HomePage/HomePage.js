import React from "react";
import classes from "./HomePage.module.css";
import Header from "./Header";
import Navigation from "./Navigation";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className={classes.content}>
        <div className={classes.sideBar}>
          <Navigation />
        </div>

        <main className={classes.auctions}></main>
      </div>
    </div>
  );
};

export default HomePage;
