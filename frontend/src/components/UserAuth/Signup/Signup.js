import classes from "./Signup.module.css";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordCheckRef = useRef();
  const nicknameRef = useRef();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const regPassword = new RegExp(/^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/);
    const regEmail = new RegExp(
      "^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$"
    );
    setIsLoading(true);

    if (!regEmail.test(emailRef.current.value)) {
      setError("이메일을 정확히 입력해 주세요");
      setIsLoading(false);
      return;
    }
    if (nicknameRef.current.value.trim().length === 0) {
      setError("닉네임을 입력해 주세요");
      setIsLoading(false);
      return;
    }
    if (passwordCheckRef.current.value !== passwordRef.current.value) {
      setError("비밀번호 재입력이 잘못되었습니다");
      console.log(passwordCheckRef.current.value, passwordRef.current.value);
      setIsLoading(false);
      return;
    }
    if (!regPassword.test(passwordRef.current.value)) {
      setError(
        "패스워드는 대소문자, 숫자, 특수문자를 모두 포함하여 8~16자 이내로 작성되어야 합니다."
      );
      setIsLoading(false);
      console.log(passwordCheckRef.current.value);
      return;
    }

    const userInfo = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      nickname: nicknameRef.current.value,
    };

    fetch("http://localhost:8080/user/signup", {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setIsLoading(false);
      if (!res.ok) {
        alert("이미 등록된 이메일입니다.");
      } else {
        alert("이메일 인증을 완료하면 로그인 가능합니다.");
        history.replace("/");
      }
    });
  };

  return (
    <div className={`container-small`}>
      <section className={`${classes.authBox} flexbox`}>
        <Link to="/">
          <div className={` ${classes.imgBox}`}>
            <img className={classes.logoImg} src={logo} alt="로고" />
          </div>
        </Link>
        <form disabled={isLoading} className={classes.formBox}>
          <div className={classes.control}>
            <input
              ref={emailRef}
              className={classes.input}
              placeholder="email"
            />
          </div>
          <div className={classes.control}>
            <input
              ref={nicknameRef}
              className={classes.input}
              placeholder="nickname"
            />
          </div>
          <div className={classes.control}>
            <input
              ref={passwordRef}
              className={classes.input}
              type="password"
              placeholder="password"
            />
          </div>
          <div className={classes.control}>
            <input
              ref={passwordCheckRef}
              className={classes.input}
              type="password"
              placeholder="password"
            />
          </div>
          <div className={classes.alertMessage}>{error}</div>
          <button
            onClick={onSubmitHandler}
            className={`${classes.button} ${
              isLoading && classes.disabledButton
            }`}
          >
            {isLoading ? "로딩중" : "회원가입"}
          </button>
        </form>
        <div className={classes.helperBox}>
          <Link to="/login" className={classes.helperContent}>
            회원이신가요?
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Signup;
