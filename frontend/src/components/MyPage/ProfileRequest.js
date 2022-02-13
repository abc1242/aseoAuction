import React, { useRef, useContext, useState } from "react";
import classes from "./ProfileRequest.module.css";
import AuthContext from "../../store/auth-context";

const ProfileRequest = (props) => {
  const passwordRef = useRef();
  const authContext = useContext(AuthContext);
  const [error, setError] = useState();

  const submitHandler = (event) => {
    event.preventDefault();

    // 백엔드랑 상의해야 되는 부분 (jwt Authorization)
    // 2단계 유저 확인: jwt + 패스워드
    // 이메일도 필요한지?

    const userInfo = {
      password: passwordRef.current.value,
    };

    // 임시 코드
    props.userAuthorizationHandler(true);

    // fetch("http://localhost:8080/user/", {
    //   method: "GET",
    //   body: JSON.stringify(userInfo),
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: authContext.token,
    //   },
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       // success
    //       props.userAuthorizationHandler(true);
    //     } else {
    //       // fail
    //       setError("패스워드가 일치하지 않습니다.");
    //       props.userAuthorizationHandler(false);
    //     }
    //   })
    //   .catch(alert("서버 에러"));
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
