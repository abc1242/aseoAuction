import React, { useContext } from "react";
import classes from "./Navigation.module.css";
import sprite from "./navigation-icons.svg";
import ContentContext from "../../store/content-context";

const NavigationItem = (props) => {
  const contentContext = useContext(ContentContext);

  return (
    <li
      onClick={() => {
        props.menuSelectHandler(props.menuName);
        contentContext.changeContent(props.menuName);
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
        <span className={classes.sideNavText}>{props.menuName || "Home"}</span>
      </div>
    </li>
  );
};

export default NavigationItem;
