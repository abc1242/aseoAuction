import React from "react";
import classes from "./HomePage.module.css";
import Header from "./Header";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className={classes.content}>
        <nav className={classes.sideBar}>Navigation</nav>
        <main className={classes.auctions}>Auctions</main>
      </div>
    </div>
  );
};

export default HomePage;
