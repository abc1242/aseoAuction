import classes from "./RequestPassword.module.css";
import logo from "../../images/logo.png";
import React, { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";

const RequestPassword = () => {
  const passwordRef = useRef();
  const passwordCheckRef = useRef();
  const [error, setError] = useState(null);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const reg =
      "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8, 16}$";

    if (passwordRef.current.value !== passwordCheckRef.current.value) {
      setError("패스워드 입력이 일치하지 않습니다.");
      return;
    }

    if (!reg.test(passwordRef.current.value)) {
      setError(
        "패스워드는 대소문자, 숫자, 특수문자를 모두 포함하여 8~16자 이내로 작성되어야 합니다."
      );
      return;
    }
    // 서버 요청
  };

  return (
    <div className={`container-small`}>
      <section className={`${classes.authBox} flexbox`}>
        <Link to="/">
          <div className={` ${classes.imgBox}`}>
            <img className={classes.logoImg} src={logo} alt="로고" />
          </div>
        </Link>
        <p className={classes.helperContent}>
          비밀번호를 재설정할 수 있습니다.
        </p>
        <form className={classes.formBox}>
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
              placeholder="password check"
            />
          </div>
          <div className={classes.alertMessage}>{error}</div>
          <button onClick={onSubmitHandler} className={classes.button}>
            비밀번호 재설정
          </button>
        </form>
      </section>
    </div>
  );
};

export default RequestPassword;
