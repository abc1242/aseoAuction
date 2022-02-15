import React, { useRef, useContext, useState } from "react";
import classes from "./ProfileRequest.module.css";
import AuthContext from "../../store/auth-context";

const ProfileRequest = (props) => {
  const passwordRef = useRef();
  const authContext = useContext(AuthContext);
  const [error, setError] = useState();

  const submitHandler = (event) => {
    event.preventDefault();

    const userInfo = {
      email: authContext.email,
      password: passwordRef.current.value,
    };

    console.log(userInfo);

    fetch("http://localhost:8080/user/mypage", {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
        Authorization: authContext.token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            const userData = {
              email: data.email,
              nickname: data.nickname,
            };
            console.log(userData);
            props.userDataHandler(userData);
            props.userAuthorizationHandler(true);
          });
        } else {
          response.json().then((err) => {
            alert(err.message);
          });
          props.userAuthorizationHandler(false);
        }
      })
      .catch((err) => {
        console.log(err);
        alert("서버 오류");
      });
  };
  return (
    <div className={classes.container}>
      <div>
        <p className={classes.heading}>비밀번호 입력</p>
      </div>

      <div className={classes.content}>
        <p className={classes.passwordRequest}>
          계정 정보를 조회하기 위해서는 인증이 필요합니다. 비밀 번호 입력 후
          확인 버튼을 클릭해주세요.
        </p>
        <form onSubmit={submitHandler} className={classes.form} action="">
          <input
            className={classes.passwordInput}
            type="password"
            ref={passwordRef}
          />
          <div className={classes.alertMessage}>{error}</div>
          <button className={classes.button}> 확인</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileRequest;
