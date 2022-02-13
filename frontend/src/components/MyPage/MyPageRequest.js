import React from "react";
import classes from "./MypageRequest.module.css";

const MyPageRequest = () => {
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
        <form className={classes.form} action="">
          <input className={classes.passwordInput} type="password" />
          <button className={classes.button}> 확인</button>
        </form>
      </div>
    </div>
  );
};

export default MyPageRequest;
