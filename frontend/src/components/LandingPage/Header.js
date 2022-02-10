import React from "react";
import styles from "./Header.module.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <a href="/">
          <img className={styles.logo} src={logo} alt="로고"></img>
        </a>
        <Link to="/login" className="btn">
          로그인
        </Link>
      </header>
    </>
  );
};

export default Header;
