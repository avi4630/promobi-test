import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const QuantityOptions = ({ quantity, setQuantity, availableQuantity }) => {
  let options = [];
  if (availableQuantity < 3) {
    for (let i = 1; i <= availableQuantity; i++) {
      options.push(i);
    }
  } else {
    options = [1, 2, 3];
  };

  return (
    <>Select Quantity: 
    <DropdownButton
      size="sm"
      variant="dark"
      title={quantity}
    >{
        options.map((option) => (
          <Dropdown.Item key={option} onClick={() => setQuantity(option)}>{option}</Dropdown.Item>
        ))
      }
    </DropdownButton>
    </>
  );
};

export default React.memo(QuantityOptions);
