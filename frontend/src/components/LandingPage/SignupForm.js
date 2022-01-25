import React, { useState } from "react";
import SignupCheck from "./SignupCheck";
import SignupCheckInfo from "./SignupCheckInfo";
import "./Signup.css";
import { Button, Form } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";

const SignupForm = ({ submitForm }) => {
  const { handleChange, values, handleSubmit, errors } = SignupCheck(
    submitForm,
    SignupCheckInfo
  );
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <Form.Group className="form-inputs">
          <Form.Label htmlFor="email" className="form-label">
            이메일
          </Form.Label>
          <Form.Control
            id="email"
            type="email"
            name="email"
            className="form-input"
            placeholder="이메일"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </Form.Group>

        <Form.Group className="form-inputs">
          <Form.Label htmlFor="password" className="form-label">
            비밀번호
          </Form.Label>
          <Form.Control
            id="password"
            type="password"
            name="password"
            className="form-input"
            placeholder="비밀번호"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </Form.Group>

        <Form.Group className="form-inputs">
          <Form.Label htmlFor="password2" className="form-label">
            비밀번호 재입력
          </Form.Label>
          <Form.Control
            id="password2"
            type="password"
            name="password2"
            className="form-input"
            placeholder="비밀번호 재입력"
            value={values.password2}
            onChange={handleChange}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </Form.Group>

        <Form.Group className="form-inputs">
          <Form.Label htmlFor="username" className="form-label">
            닉네임
          </Form.Label>
          <Form.Control
            id="username"
            type="text"
            name="username"
            className="form-input"
            placeholder="닉네임"
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </Form.Group>

        <hr />

        <Button className="form-input-btn" type="submit">
          회원 가입
        </Button>
        <span className="form-input-login">
          아이디 있는사람은 <a href="#">로그인</a>하러 가세요
        </span>
        <GoogleLogin />
      </form>
    </div>
  );
};

export default SignupForm;
