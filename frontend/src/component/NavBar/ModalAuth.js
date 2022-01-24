import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Login from "./Login";
import Signup from "./Signup";

const ModalAuth = (props) => {
  // const handleClose = () => setShow(false);

  const [showLogin, setShowLogin] = useState(true); // 로그인할지, 사인업할지 기준이 되는 변수

  return (
    <>
      <Modal show={props.modalDisplayed} onHide={props.ModalDisplayHandler}>
        <Modal.Header closeButton onClick={props.modalDisplayHandler}>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* signup or login */}
          {showLogin ? <Login /> : <Signup />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.modalDisplayHandler}>
            Close
          </Button>
          <Button variant="primary" onClick={props.modalDisplayHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAuth;
