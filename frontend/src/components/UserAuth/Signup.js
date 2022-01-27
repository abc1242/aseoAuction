import React from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import "./Signup.css";
import AuthIcon from "../../images/blacklogo.png";
import { useReducer, useState, useEffect } from "react";
import styled from "styled-components";

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
    return { value: action.val, isValid: action.val.trim().length > 7 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 7 };
  }
  return { value: "", isValid: false };
};

const passwordCheckReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val === action.password };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value === action.password };
  }
};

const nicknameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 0 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 0 };
  }
};

const Signup = (props) => {
  const [formIsValid, setFormIsValid] = useState(true);

  // 이메일, 패스워드, 패스워드 재입력, 닉네임의 useReducer

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: undefined,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: undefined,
  });

  const [passwordCheckState, dispatchPasswordCheck] = useReducer(
    passwordCheckReducer,
    {
      value: "",
      isValid: undefined,
    }
  );

  const [nicknameState, dispatchNickname] = useReducer(nicknameReducer, {
    value: "",
    isValid: undefined,
  });

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailState.isValid &&
          passwordState.isValid &&
          nicknameState.isValid &&
          passwordCheckState.isValid
      );
    });
    return () => {
      clearTimeout(identifier);
    };
  }, [
    emailState.isValid,
    passwordState.isValid,
    nicknameState.isValid,
    passwordCheckState.isValid,
  ]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordCheckChangeHandler = (event) => {
    dispatchPasswordCheck({
      type: "USER_INPUT",
      val: event.target.value,
      password: passwordState.value,
    });
  };

  const nicknameChangeHandler = (event) => {
    dispatchNickname({
      type: "USER_INPUT",
      val: event.target.value,
    });
  };
  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const validatePasswordCheckHandler = () => {
    dispatchPasswordCheck({
      type: "INPUT_BLUR",
      password: passwordState.value,
    });
  };

  const validateNicknameHandler = () => {
    dispatchNickname({
      type: "INPUT_BLUR",
    });
  };

  console.log(passwordCheckState.isValid);
  return (
    <Container>
      <Row>
        <Col>
          <img className="icon-img" src={AuthIcon} alt="icon" />
          <Form className="mt-3">
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                className={emailState.isValid === false ? "invalid" : ""}
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler}
                type="email"
                placeholder="이메일"
              />
              <AlertMessage
                className={
                  emailState.isValid === false ? "show-alert" : "hide-alert"
                }
              >
                <small>정확한 이메일을 입력해주세요</small>
              </AlertMessage>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                className={passwordState.isValid === false ? "invalid" : ""}
                onChange={passwordChangeHandler}
                onBlur={validatePasswordHandler}
                type="password"
                placeholder="비밀번호"
              />
              <AlertMessage
                className={
                  passwordState.isValid === false ? "show-alert" : "hide-alert"
                }
              >
                <small>비밀번호는 8자 이상입니다.</small>
              </AlertMessage>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formPasswordCheck">
              <Form.Control
                className={
                  passwordCheckState.isValid === false ? "invalid" : ""
                }
                onChange={passwordCheckChangeHandler}
                onBlur={validatePasswordCheckHandler}
                type="password"
                placeholder="비밀번호 재입력"
              />
              <AlertMessage
                className={
                  passwordCheckState.isValid === false
                    ? "show-alert"
                    : "hide-alert"
                }
              >
                <small>비밀번호와 일치하지 않습니다.</small>
              </AlertMessage>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicNickname">
              <Form.Control
                className={nicknameState.isValid === false ? "invalid" : ""}
                onChange={nicknameChangeHandler}
                onBlur={validateNicknameHandler}
                type="text"
                placeholder="닉네임"
              />
              <AlertMessage
                className={
                  nicknameState.isValid === false ? "show-alert" : "hide-alert"
                }
              >
                <small>닉네임을 입력하세요</small>
              </AlertMessage>
            </Form.Group>

            <Button disabled={!formIsValid} variant="dark col-12" type="submit">
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
