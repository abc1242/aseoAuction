import React from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import "./Signup.css";
import AuthIcon from "../../images/blacklogo.png";
import { useReducer } from "react";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim() > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim() > 6 };
  }
};

const Signup = (props) => {
  // 이메일, 패스워드, 패스워드 재입력, 닉네임의 useReducer
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });

  return (
    <Container>
      <Row>
        <Col>
          <img className="icon-img" src={AuthIcon} alt="icon" />
          <Form className="mt-3">
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="이메일" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="비밀번호" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="비밀번호 재입력" />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Control type="text" placeholder="닉네임" />
            </Form.Group>

            <Button variant="dark col-12" type="submit">
              회원가입
            </Button>
          </Form>
          <p className="mt-3 mb-0">
            <a href="#" className="text-decoration-none">
              <small onClick={props.loginButtonClicked} className="reset">
                회원이신가요?
              </small>
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
