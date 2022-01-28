import React from "react";
import SignupSuccess from "./SignupSuccess";
import SignupForm from "./SignupForm";
import { useState } from "react";

const Signup = (props) => {
  const [signupFinished, setSignupFinished] = useState(false);

  const onSignupHandler = () => {
    setSignupFinished(true);
  };

  return (
    <>
      {!signupFinished ? (
        <SignupForm
          loginButtonClicked={props.loginButtonClicked}
          onSignup={onSignupHandler}
        />
      ) : (
        <SignupSuccess hideModal={props.hideModal} />
      )}
    </>
  );
};

export default Signup;
