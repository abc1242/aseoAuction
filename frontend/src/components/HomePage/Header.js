import React from "react";
import classes from "./Header.module.css";
import { ReactComponent as MagnifyingGlassIcon } from "../../images/SVG/magnifying-glass.svg";
import { ReactComponent as UserIcon } from "../../images/SVG/user.svg";
import logo from "../../images/logo.png";
import { ReactComponent as LogoutIcon } from "../../images/SVG/log-out.svg";
import { ReactComponent as EditIcon } from "../../images/SVG/pencil.svg";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import ContentContext from "../../store/content-context";
import { useRef } from "react";

const Header = () => {
  const authContext = useContext(AuthContext);
  const contentContext = useContext(ContentContext);
  const history = useHistory();
  const searchRef = useRef("");

  const searchSubmitHandler = (event) => {
    event.preventDefault();
    history.push("/");
    contentContext.changeSearch(searchRef.current.value);
    contentContext.changeContent("");
  };

  return (
    <header className={classes.header}>
      <a href="/">
        <img className={classes.logo} src={logo} alt="logo" />
      </a>
      <form onSubmit={searchSubmitHandler} className={classes.search}>
        <input
          type="text"
          className={classes.searchInput}
          ref={searchRef}
          placeholder="검색"
        />
        <button className={classes.searchButton}>
          <MagnifyingGlassIcon className={classes.searchIcon} />
        </button>
      </form>
      <div className={classes.userIconBox}>
        <UserIcon className={classes.userIcon} />
        <div className={classes.userDropDown}>
          <menu
            onClick={() => {
              history.push("/profile");
            }}
            className={classes.userDropDownMenu}
          >
            <EditIcon className={classes.userDropDownIcon} />
            <span onClick={() => {}} className={classes.userDropDownText}>
              회원 정보
            </span>
          </menu>
          <menu
            onClick={() => {
              authContext.logout();
              history.push("/");
            }}
            className={classes.userDropDownMenu}
          >
            <LogoutIcon className={classes.userDropDownIcon} />
            <span className={classes.userDropDownText}>로그 아웃</span>
          </menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
