import React from "react";
import { Button, Modal } from "react-bootstrap";
import Login from "../UserAuth/Login";
import Signup from "../UserAuth/Signup";
import BlackLogo from "../../images/blacklogo.png";

const ModalAuth = (props) => {
  return (
    <>
      <Modal
        backdrop={true}
        show={props.modalDisplayed}
        onHide={props.hideModal}
        className="text-center"
      >
        <Modal.Body>
          {props.wantLogin ? (
            <Login signupButtonClicked={props.signupButtonClicked} />
          ) : (
            <Signup loginButtonClicked={props.loginButtonClicked} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalAuth;
