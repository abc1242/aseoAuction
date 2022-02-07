import React from "react";
import styles from "./Header.module.css";
import logo from "../../images/logo.png";

const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <a href="#">
          <img className={styles.logo} src={logo}></img>
        </a>
        <a className="btn" href="#">
          로그인
        </a>
      </header>
    </>
  );
};

export default Header;
