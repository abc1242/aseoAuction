import React from "react";
import { Nav, Navbar, Container, NavDropdown, Modal } from "react-bootstrap";
import ModalButton from "./ModalButton";

const NavBar = () => {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">BERRYFIT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* 이 버튼 클릭하면 로그인 */}
              <ModalButton />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* 이 버튼 클릭하면 사인업 */}
      <ModalButton />
    </div>
  );
};

export default NavBar;
