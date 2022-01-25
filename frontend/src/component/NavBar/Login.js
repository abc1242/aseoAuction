import React from "react";
import { Form, Button } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { useEffect, useState } from "react";
import './Login.css';
import { type } from "@testing-library/user-event/dist/type";



const Login = (props) => {
//   const [AlphaNum, setAlphaNum] = useState("");
//   const IsAlphaNume=(e)=>{
//   const curValue=e.currentTarget.value;
//   const notNum=/[^a-z0-9~!@#$%";'^,&*()_+|</>=>`?:{[\}]/gi;
// // 숫자, 대소문자, 특수문자 빼곤 안됨,https://grownfresh.tistory.com/112 일단 낼참고
//   setAlphaNum(curValue.replace(notNum,''))
// };
  return (
    <div className="login-form">
      <h3>Login</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          {/* <Form.Label className="d-inline-block w-25" >Email address</Form.Label>
          <Form.Control 
            className="d-inline-block w-75"
            type="email" 
            // placeholder="Enter email"
            required
             /> */}
          {/* <Form.Label>Email address</Form.Label> */}
          <Form.Control
            id="input"
            type="email" 
            placeholder="Enter Email"
            required
             />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          {/* <Form.Label id="label">PASSWORD</Form.Label> */}
          <Form.Control id="input"
            
            type="password"
            placeholder="PASSWORD"
            required
             />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        
        {/* <Button variant="primary" type="submit"> */}
        <Button className="login-button" type="submit">
          Login
        </Button>  
      </Form>
      <div className="caption">
        <a href="#" onClick={props.signupButtonClicked}>아직 회원이 아니신가요?</a>
        {/* <Button onClick={props.signupButtonClicked}>회원가입</Button> */}
      </div>
    </div>
  );
};

export default Login;
