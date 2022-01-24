import React from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Login from "./Login";
import Signup from "./Signup";

const ModalAuth = (props) => {
  return (
    <>
      <Modal
        backdrop={true}
        show={props.modalDisplayed}
        onHide={props.hideModal}
      >
        <Modal.Header closeButton onClick={props.hideModal}>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* signup or login */}
          {props.wantLogin ? <Login /> : <Signup />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.hideModal}>
            Close
          </Button>
          <Button variant="primary" onClick={props.hideModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAuth;
