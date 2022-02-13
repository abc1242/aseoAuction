import React, { useRef, useState } from "react";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const emailRef = useRef();
  const nicknameRef = useRef();
  const passwordRef = useRef();
  const passwordCheckRef = useRef();
  const [error, setError] = useState(null);

  const putAccountHandler = () => {
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
  };
  const resignAccountHandler = () => {};

  return (
    <div className={classes.container}>
      <p className={classes.title}>회원정보 수정</p>
      <form className={classes.form} action="">
        <div className={classes.control}>
          <label className={classes.label}>이메일</label>
          <input className={classes.input} ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label className={classes.label}>닉네임</label>
          <input className={classes.input} ref={nicknameRef} />
        </div>
        <p className={classes.guideText}>
          현재 비밀번호 혹은 바꿀 비밀번호를 입력하세요.
        </p>
        <div className={classes.control}>
          <label className={classes.label}>비밀번호</label>
          <input type="password" className={classes.input} ref={passwordRef} />
        </div>
        <div className={classes.control}>
          <label className={classes.label}>비밀번호 재입력</label>
          <input
            type="password"
            className={classes.input}
            ref={passwordCheckRef}
          />
        </div>
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
