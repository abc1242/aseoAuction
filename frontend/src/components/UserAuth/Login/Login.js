import classes from "./Login.module.css";
import logo from "../../../images/logo.png";
import React, { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import AuthContext from "../../../store/auth-context";

const Login = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // validation
    if (emailRef.current.value.trim().length === 0) {
      setError("이메일을 입력하세요");
      return;
    }
    if (passwordRef.current.value.trim().length === 0) {
      setError("비밀번호를 입력하세요");
      return;
    }

    const userInfo = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    fetch("http://localhost:8080/user/login", {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            authCtx.login({ token: data.accessToken, email: userInfo.email });
            history.push("/");
          });
        } else {
          res.json().then((err) => {
            alert("이메일과 비밀번호를 다시 확인해주세요");
          });
        }
      })
      .catch((err) => {
        console.log(err);
        alert("서버 오류");
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
              ref={passwordRef}
              className={classes.input}
              type="password"
              placeholder="password"
            />
          </div>
          <div className={classes.alertMessage}>{error}</div>
          <button onClick={onSubmitHandler} className={classes.button}>
            로그인
          </button>
        </form>
        <div className={classes.helperBox}>
          <Link className={`${classes.helperContent} ${classes.alignLeft}`}>
            비밀번호 찾기
          </Link>
          <div className={`${classes.helperContent}`}>|</div>
          <Link
            to="/signup"
            className={`${classes.helperContent} ${classes.alignLeft}`}
          >
            회원 가입
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Login;
