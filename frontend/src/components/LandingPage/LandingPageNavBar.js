import React from "react";
import { Button, Container, Nav, Image } from "react-bootstrap";
import mainLogo from "../../images/BERRYFIT.png";
import "./LandingPageNavBar.css";

const LandingPageNavBar = (props) => {
  return (
    <Container className="px-7 d-flex align-items-center justify-content-between">
      <Nav.Item className="mt-1">
        <Image className="Logo " src={mainLogo}></Image>
      </Nav.Item>
      <Nav.Item>
        <Button onClick={props.loginButtonClicked} variant="outline-light">
          로그인
        </Button>
      </Nav.Item>
    </Container>
  );
};

export default LandingPageNavBar;
