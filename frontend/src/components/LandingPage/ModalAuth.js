import React from "react";
import { Modal } from "react-bootstrap";
import Login from "../UserAuth/Login/Login";
import Signup from "../UserAuth/Signup/Signup";

const ModalAuth = (props) => {
  return (
    <>
      <Modal
        backdrop={true}
        show={props.modalDisplayed}
        onHide={props.hideModal}
      >
        <Modal.Body className="text-center">
          {props.wantLogin ? (
            <Login signupButtonClicked={props.signupButtonClicked} />
          ) : (
            <Signup
              hideModal={props.hideModal}
              loginButtonClicked={props.loginButtonClicked}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalAuth;
