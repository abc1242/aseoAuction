import React from "react";
import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={classes.container}>
      <nav>
        <ul className={classes.flexbox}>
          <li>navitem</li>
          <li>navitem</li>
          <li>navitem</li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
