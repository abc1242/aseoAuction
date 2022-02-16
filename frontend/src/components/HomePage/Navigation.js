import React from "react";
import classes from "./Navigation.module.css";
// import sprite from "./navigation-icons.svg";
import { useState } from "react";
import NavigationItem from "./NavigationItem";
import sprite from "./navigation-icons.svg";
import { useHistory } from "react-router-dom";

const Navigation = () => {
  const history = useHistory();
  const [selectedMenu, setSelectedMenu] = useState(null);

  const menuSelectHandler = (menuNum) => {
    history.push("/");
    setSelectedMenu(menuNum);
  };

  const menuList = [
    { name: "", spriteId: "#icon-home" },
    { name: "도서음반", spriteId: "#icon-queue_music" },
    { name: "가전제품", spriteId: "#icon-computer" },
    { name: "가구", spriteId: "#icon-hotel" },
    { name: "스포츠취미", spriteId: "#icon-sports_soccer" },
    { name: "요리베이킹", spriteId: "#icon-lunch_dining" },
    { name: "유아임부", spriteId: "#icon-child_friendly" },
    { name: "의류잡화", spriteId: "#icon-checkroom" },
    { name: "반려동물", spriteId: "#icon-pest_control_rodent" },
  ];

  return (
    <nav>
      <ul className={classes.sideNav}>
        {menuList.map((menu) => (
          <NavigationItem
            selectedMenu={selectedMenu}
            menuSelectHandler={menuSelectHandler}
            menuName={menu.name}
            spriteId={menu.spriteId}
          />
        ))}
        <li
          onClick={() => {
            history.push("/rooms/create/");
            setSelectedMenu(null);
          }}
          className={classes.createLink}
        >
          <svg className={classes.createIcon}>
            <use href={sprite + "#icon-library_add"}></use>
          </svg>
          <div className={classes.createBox}>
            <span className={classes.createText}>경매실 생성</span>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
