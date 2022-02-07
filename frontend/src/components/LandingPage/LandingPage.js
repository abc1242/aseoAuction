import React from "react";
import Header from "./Header";
import SectionHero from "./SectionHero";
import SectionHow from "./SectionHow";
import AboutSection from "./AboutSection";
import FunctionSection from "./FunctionSection";
import { useState } from "react";
import ModalAuth from "./ModalAuth";

// 랜딩페이지 배경색 지정

const LandingPage = () => {
  const [modalDisplayed, setModalDisplayed] = useState(false);
  const [wantLogin, setWantLogin] = useState(true);

  const hideModal = () => setModalDisplayed(false);

  const loginButtonClicked = () => {
    setModalDisplayed(true);
    setWantLogin(true);
  };

  const signupButtonClicked = () => {
    setModalDisplayed(true);
    setWantLogin(false);
  };

  return (
    <>
      <Header />
      <main>
        <SectionHero />
        <SectionHow />
      </main>
      {/* <AboutSection signupButtonClicked={signupButtonClicked} />

      <FunctionSection />
      <ModalAuth
        modalDisplayed={modalDisplayed}
        hideModal={hideModal}
        wantLogin={wantLogin}
        loginButtonClicked={loginButtonClicked}
        signupButtonClicked={signupButtonClicked}
      /> */}
    </>
  );
};

export default LandingPage;
