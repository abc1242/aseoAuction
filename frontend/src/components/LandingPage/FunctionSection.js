import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import recipeImage from "../../images/recipe.png";
import "./FunctionSection.css";

const FunctionSection = () => {
  return (
    <Container fluid className="py-3 bg-white">
      <Container className="px-0">
        <Row>
          <Col className="text-center">
            <Image src={recipeImage}></Image>
          </Col>
          <Col className=" my-auto">
            <div className="function-text-wrapper text-center text-dark align-items-center d-flex flex-column">
              <div className="top-line text-dark">유저들과 소통하세요</div>
              <h1 className="function-heading">식단 코칭</h1>
              <p className="function-subtitle">
                BERRYFIT은 유저의 식단이 목표에 맞는지 확인해줍니다. 더불어,
                식단 고수에게 코칭을 받을 수도 있어요. 이제 혼자서 하는
                식단관리는 멈춰주세요.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default FunctionSection;
