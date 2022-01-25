import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import dietImage from "../../images/diet.png";
import "./AboutSection.css";

const AboutSection = (props) => {
  return (
    <Container fluid className="py-2 mt-2">
      <Container className="px-0">
        <Row>
          <Col className="text-white my-auto">
            <div className="home__hero-text-wrapper text-center align-items-center d-flex flex-column">
              <div className="top-line">가장 스마트한 식단관리</div>
              <h1 className="heading">BERRYFIT</h1>
              <p className="home__hero-subtitle">
                아직도 닭가슴살과 고구마를 드시나요? 쉽고 간편한 레시피를 통해
                지속가능한 다이어트를 실천해 보세요.
              </p>
              {/* 회원가입 버튼 */}
              <Button
                onClick={props.signupButtonClicked}
                variant="success"
                size="lg"
              >
                당장 다이어트 하러 가볼까요
              </Button>
            </div>
          </Col>
          <Col className="text-center">
            <Image src={dietImage}></Image>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default AboutSection;
