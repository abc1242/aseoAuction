import React from "react";
import classes from "./Header.module.css";
import { ReactComponent as MagnifyingGlassIcon } from "../../images/SVG/magnifying-glass.svg";
import { ReactComponent as UserIcon } from "../../images/SVG/user.svg";
import logo from "../../images/logo.png";
import { ReactComponent as LogoutIcon } from "../../images/SVG/log-out.svg";
import { ReactComponent as EditIcon } from "../../images/SVG/pencil.svg";

const Header = () => {
  return (
    <header className={classes.header}>
      <img className={classes.logo} src={logo} alt="logo" />
      <form action="#" className={classes.search}>
        <input type="text" className={classes.searchInput} placeholder="검색" />
        <button className={classes.searchButton}>
          <MagnifyingGlassIcon className={classes.searchIcon} />
        </button>
      </form>
      <div className={classes.userIconBox}>
        <UserIcon className={classes.userIcon} />
        <div className={classes.userDropDown}>
          <menu className={classes.userDropDownMenu}>
            <EditIcon className={classes.userDropDownIcon} />
            <span>회원 정보</span>
          </menu>
          <menu className={classes.userDropDownMenu}>
            <LogoutIcon className={classes.userDropDownIcon} />
            <span>로그 아웃</span>
          </menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
