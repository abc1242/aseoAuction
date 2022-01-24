import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Login from "./Login";
import Signup from "./Signup";

const ModalButton = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showLogin, setShowLogin] = useState(true); // 로그인할지, 사인업할지 기준이 되는 변수

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        signup or login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* signup or login */}
          {showLogin ? <Login /> : <Signup />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalButton;
