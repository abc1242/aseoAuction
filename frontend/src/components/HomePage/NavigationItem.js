import React from "react";
import classes from "./Navigation.module.css";
import sprite from "./navigation-icons.svg";

const NavigationItem = (props) => {
  return (
    <li
      onClick={() => {
        props.menuSelectHandler(props.menuName);
      }}
      className={classes.sideNavItem}
    >
      <div
        className={`${classes.sideNavLink} ${
          props.selectedMenu === props.menuName && classes.sideNavLinkActive
        }`}
      >
        <svg className={classes.sideNavIcon}>
          <use href={sprite + props.spriteId}></use>
        </svg>
        <span className={classes.sideNavText}>{props.menuName}</span>
      </div>
    </li>
  );
};

export default NavigationItem;
