import React from "react";
import "./Header.css";
import logo from "../../images/logo.png";

const Header = (props) => {
  return (
    <>
      <header className="header">
        <a href="#">
          <img className="logo" src={logo}></img>
        </a>
        <a className="login-button" href="#">
          로그인
        </a>
      </header>
    </>
  );
};

export default Header;
