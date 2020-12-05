import React from "react";
import { Modal, Alert } from "react-bootstrap";

const MinLimitModal = (props) => {
  return (
    <Modal {...props} centered>
      <Alert variant="danger">Required Minimum 1 Item</Alert>
    </Modal>
  );
};

const MaxLimitModal = (props) => {
  return (
    <Modal {...props} centered>
      <Alert variant="danger">Max Limit Exceeded</Alert>
    </Modal>
  );
};

export { MaxLimitModal, MinLimitModal };
