import React, { useState } from "react";
import ModalAuth from "./ModalAuth";
import { Nav, Navbar, Container, Button } from "react-bootstrap";

const NavBar = () => {
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

  console.log(wantLogin);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">BERRYFIT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* 이 버튼 클릭하면 로그인 */}
              <Button variant="primary" onClick={loginButtonClicked}>
                login
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* 이 버튼 클릭하면 사인업 */}
      <Button variant="primary" onClick={signupButtonClicked}>
        Signup
      </Button>
      <ModalAuth
        wantLogin={wantLogin}
        hideModal={hideModal}
        modalDisplayed={modalDisplayed}
        signupButtonClicked={signupButtonClicked}
      />
    </div>
  );
};

export default NavBar;
