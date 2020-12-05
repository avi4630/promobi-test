import React from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const ModalComponent = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose} size="sm" className="b-secondary">
      <Modal.Header closeButton>
        <Alert variant="success">Your Order Has Been Placed</Alert>
      </Modal.Header>
      <Modal.Body>
        Thank Your For Shopping...
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center bg-light">
        <Link to="/">
          <Button onClick={handleClose} size="sm">
            Continue Shopping
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(ModalComponent);
