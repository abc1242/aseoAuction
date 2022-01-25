import { useEffect, useState } from "react"
// import SignupCheckInfo from "./SignupCheckInfo";

const SignupCheck = (callback, SignupCheckInfo) => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  })

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = event => {
    const {name, value} = event.target
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();

    setErrors(SignupCheckInfo(values));
    setIsSubmitting(true);
    console.log('2여기는 signupcheck.js에서 출력')
    console.log(this.email);    
  };

  useEffect(() => {
    if(Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return { handleChange, values, handleSubmit, errors };
}

export default SignupCheck;