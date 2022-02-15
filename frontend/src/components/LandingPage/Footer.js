import React from "react";
import logo from "../../images/logo.png";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.layout} container grid grid--3--cols`}>
        <div className={styles.footerSection}>
          <img class={styles.footerLogo} src={logo} alt="logo" />
        </div>
        <div className={styles.footerSection}>
          <p className={styles.footerHeading}>Dev Team</p>
          <p className={styles.footerContent}>"밥은 먹고 다니나"</p>
        </div>
        <div className={styles.footerSection}>
          <p className={styles.footerHeading}>Contact</p>
          <p className={styles.footerContent}>01054130537</p>
          <p className={styles.footerContent}>pcg0537@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
