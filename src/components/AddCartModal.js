import React from "react";
import styled from "styled-components";
import { Button, Modal, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

const Image = styled.img`
  border-radius: 20px;
  width:200px;
  height:200px;
`;

const ModalComponent = ({ show, setShow, imgUrl, title, price, quantity }) => {
  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose} size="sm" className="b-secondary">
      <Modal.Header closeButton>
      <Alert variant="success">Item Addedd To Cart</Alert>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <Image src={imgUrl} />
        </div>
        <Modal.Title className="text-center border m-1 rounded">{title.toUpperCase()}</Modal.Title>
        <h6 className="text-center"><i>Rate: ₹{price}</i></h6>
        <h6 className="text-center"><i>No Of Items: {quantity}</i></h6>
        <h5 className="text-center"><i>Total Price: ₹{price * quantity}</i></h5>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between bg-light">
        <Link to="/">
          <Button variant="secondary" onClick={handleClose} size="sm">
            Continue Shopping
          </Button>
        </Link>
        <Link to="/cart">
          <Button variant="primary" size="sm">
            Go To Cart
            </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(ModalComponent);
