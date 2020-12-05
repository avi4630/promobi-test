import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const ErrorCode = styled.h1`
  font-size: 1000%;
`;

const Default = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div>
        <ErrorCode className="font-weight-bold text-muted">
          404
        </ErrorCode>
        <h2>Oops! PAGE_NOT_FOUND</h2>
        <p></p>
        <Button href="/">Go To Homepage</Button>
      </div>
    </div>
  );
};

export default  Default;
