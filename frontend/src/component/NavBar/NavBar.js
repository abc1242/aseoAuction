import React, { useState } from "react";
import ModalAuth from "./ModalAuth";
import {
  Nav,
  Navbar,
  Container,
  NavDropdown,
  Modal,
  Button,
} from "react-bootstrap";

const NavBar = () => {
  const [modalDisplayed, setModalDisplayed] = useState(false);

  const displayModal = () =>
    setModalDisplayed((prevState) => {
      return !modalDisplayed;
    });

  console.log(modalDisplayed);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">BERRYFIT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* 이 버튼 클릭하면 로그인 */}
              <Button variant="primary" onClick={displayModal}>
                login
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* 이 버튼 클릭하면 사인업 */}
      <Button variant="primary" onClick={displayModal}>
        Signup
      </Button>
      <ModalAuth
        modalDisplayHandler={displayModal}
        modalDisplayed={modalDisplayed}
      />
    </div>
  );
};

export default NavBar;
