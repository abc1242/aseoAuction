import React from "react";
import LandingPageNavBar from "./LandingPageNavBar";
import AboutSection from "./AboutSection";
import styled from "styled-components";
import FunctionSection from "./FunctionSection";
import { useState } from "react";
import ModalAuth from "./ModalAuth";

// 랜딩페이지 배경색 지정
const Wrapper = styled.section`
  background: black;
`;

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
    <Wrapper>
      <LandingPageNavBar loginButtonClicked={loginButtonClicked} />
      <AboutSection signupButtonClicked={signupButtonClicked} />
      <FunctionSection />
      <ModalAuth
        modalDisplayed={modalDisplayed}
        hideModal={hideModal}
        wantLogin={wantLogin}
        loginButtonClicked={loginButtonClicked}
        signupButtonClicked={signupButtonClicked}
      />
    </Wrapper>
  );
};

export default LandingPage;
