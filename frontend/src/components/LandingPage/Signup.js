import React, { useState } from "react";
import SignupForm from "./SignupForm";
import SignupSuccess from "./SignupSuccess";

const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  function submitForm() {
    setIsSubmitting(true);
    console.log(
      "여기서 axios를 통해 back과 db를 연결해서 로그인 정보를 입력후 로그인 시킬 예정"
    );
    alert("회원가입이 완료되었습니다.");
  }
  return (
    <div>
      {!isSubmitting ? (
        <SignupForm submitForm={submitForm} />
      ) : (
        <SignupSuccess />
      )}
    </div>
  );
};

export default Signup;
