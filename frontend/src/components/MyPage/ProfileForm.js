import React, { useRef, useState, useContext } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const ProfileForm = (props) => {
  const emailRef = useRef();
  const nicknameRef = useRef();
  const passwordRef = useRef();
  const passwordCheckRef = useRef();
  const [error, setError] = useState(null);
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const putAccountHandler = (event) => {
    event.preventDefault();

    // validation check
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

    fetch("/api/user/editmypage", {
      method: "PUT",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-type": "application/json",
        Authorization: authContext.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert("회원 정보가 수정되었습니다.");
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  const resignAccountHandler = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/user/delete", {
      method: "DELETE",
      body: JSON.stringify({
        email: authContext.email,
      }),
      headers: {
        "Content-type": "application/json",
        Authorization: authContext.token,
      },
    })
      // 성공, 실패 모두 파싱
      .then((response) => response.json())
      .then((data) => {
        authContext.logout();
        alert(data.message);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.container}>
      <p className={classes.title}>회원정보 수정</p>
      <form className={classes.form} action="">
        <div className={classes.control}>
          <label className={classes.label}>이메일</label>
          <input
            disabled
            className={classes.input}
            ref={emailRef}
            placeholder={props.userData.email}
            value={props.userData.email}
          />
        </div>
        <div className={classes.control}>
          <label className={classes.label}>닉네임</label>
          <input
            className={classes.input}
            ref={nicknameRef}
            placeholder={props.userData.nickname}
          />
        </div>
        <p className={classes.guideText}>
          현재 비밀번호 혹은 바꿀 비밀번호를 입력하세요.
        </p>
        <div className={classes.control}>
          <label className={classes.label}>비밀번호</label>
          <input type="password" ref={passwordRef} className={classes.input} />
        </div>
        <div className={classes.control}>
          <label className={classes.label}>비밀번호 재입력</label>
          <input
            type="password"
            className={classes.input}
            ref={passwordCheckRef}
          />
        </div>
        <div className={classes.alertMessage}>{error}</div>
        <button onClick={putAccountHandler} className={classes.submitButton}>
          확인
        </button>
        <button onClick={resignAccountHandler} className={classes.resignButton}>
          탈퇴
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
