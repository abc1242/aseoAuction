import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import WelcomeIcon from "../../../images/welcome.png";

const SignupSuccess = (props) => {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <img className="icon-img" src={WelcomeIcon} alt="icon" />
            <section>
              <h3>
                <b>환영합니다! </b>
              </h3>
              <small>
                이메일 인증을 완료하면, BERRYFIT을 즐길 수 있습니다.{" "}
              </small>
            </section>

            <hr></hr>
          </Col>
        </Row>
        <Button onClick={props.hideModal} variant="success col-12">
          닫기
        </Button>
      </Container>
    </div>
  );
};

export default SignupSuccess;
