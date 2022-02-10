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

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // validation
    if (!emailRef.current.value.includes("@")) {
      setError("이메일을 정확히 입력해 주세요");
      return;
    }
    if (nicknameRef.current.value.trim().length === 0) {
      setError("닉네임을 입력해 주세요");
      return;
    }
    if (passwordRef.current.value.trim().length === 0) {
      setError("비밀번호를 입력해주세요");
      return;
    }
    if (passwordCheckRef.current.value !== passwordRef.current.value) {
      setError("비밀번호 재입력이 잘못되었습니다");
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
    })
      .then((res) => {
        if (!res.ok) {
          alert("이미 등록된 이메일입니다.");
        } else {
          alert("이메일 인증을 완료하면 로그인 가능합니다.");
          history.replace("/");
        }
      })
      // 네트워크 장애 or CORS 에러, 404 not found 500 internal server error는 처리하지 않음
      .catch((err) => {
        console.log(err);
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
        <form className={classes.formBox}>
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
          <button onClick={onSubmitHandler} className={classes.button}>
            회원가입
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
