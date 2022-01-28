import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import AuthIcon from "../../../images/blacklogo.png";
import "./Login.css";
import styled from "styled-components";
import { useReducer, useState, useEffect } from "react";
import axios from "axios";

const AlertMessage = styled.div`
  text-align: left;
`;

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
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // 전체 form의 유효성 state
  const [formIsValid, setFormIsValid] = useState(true);

  // 이메일과 패스워드의 useReducer
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailState.isValid && passwordState.isValid);
    });
    return () => {
      clearTimeout(identifier);
    };
  }, [emailState.isValid, passwordState.isValid]);

  // 입력이 있을때 이메일과 패스워드의 reducer 함수를 호출
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  // Blur가 발생할때 reducer 함수 호출.
  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const userInfo = {
      email: emailState.value,
      password: passwordState.value,
    };

    axios
      .post("http://localhost:8080/user/login", userInfo)
      .then((res) => {
        window.alert("로그인 되었습니다");
      })
      .catch((error) => {
        console.log("이메일과 비밀번호를 확인해주세요");
      });
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <img className="icon-img" src={AuthIcon} alt="icon" />
            <Form onSubmit={submitHandler} className="mt-3">
              <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Control
                  className={emailState.isValid === false ? "invalid" : ""} // 유효성 클래스 추가
                  type="email"
                  placeholder="이메일"
                  onChange={emailChangeHandler}
                  onBlur={validateEmailHandler}
                />
                <AlertMessage
                  className={
                    emailState.isValid === false ? "show-alert" : "hide-alert"
                  }
                >
                  <small>유효하지 않은 이메일입니다.</small>
                </AlertMessage>
              </Form.Group>

              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Control
                  className={passwordState.isValid === false ? "invalid" : ""}
                  type="password"
                  placeholder="비밀번호 재입력"
                  onChange={passwordChangeHandler}
                  onBlur={validatePasswordHandler}
                />
                <AlertMessage
                  className={
                    passwordState.isValid === false
                      ? "show-alert"
                      : "hide-alert"
                  }
                >
                  <small>비밀번호를 제대로 입력하세요.</small>
                </AlertMessage>
              </Form.Group>
              <Button
                variant="dark col-12"
                type="submit"
                disabled={!formIsValid}
              >
                로그인
              </Button>
            </Form>
            <p className="mt-3 mb-0">
              <a href="#" className="text-decoration-none">
                <small className="reset">비밀번호를 잊으셨나요?</small>
              </a>
            </p>
            <hr></hr>
            <Button
              variant="success col-12"
              onClick={props.signupButtonClicked}
            >
              회원가입
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
