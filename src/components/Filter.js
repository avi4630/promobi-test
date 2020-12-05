import React, { useContext } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { ProductContext } from "../Context";

const Filter = () => {
  const {
    products,
    setProductName,
    setCategory,
    category,
    setProducts
  } = useContext(ProductContext);

  //event handler for sort product in low to high order
  const sortProductByPriceLowToHigh = () => {
    let data = [...products]
    setProducts(data.sort((a, b) => a.price - b.price));
  };

  //event handler for sort product in high to low order
  const sortProductByPriceHightToLow = () => {
    let data = [...products]
    setProducts(data.sort((a, b) => b.price - a.price));
  };

  return (
    <div className="sticky-top bg-dark p-2">
      <div className="d-flex flex-wrap justify-content-center">
        <input className="rounded" onChange={(e) => setProductName(e.target.value)} placeholder="search product" />
        <DropdownButton
          className="m-2 "
          title={category == "all" ? "select category" : category}
        >
          <Dropdown.Item onClick={() => setCategory("mobile")}> mobile </Dropdown.Item>
          <Dropdown.Item onClick={() => setCategory("fashion")}> fashion </Dropdown.Item>
          <Dropdown.Item onClick={() => setCategory("home")}> home </Dropdown.Item>
          <Dropdown.Item onClick={() => setCategory("electronics")}> electronics </Dropdown.Item>
          <Dropdown.Item onClick={() => setCategory("sport")}> sport </Dropdown.Item>
          <Dropdown.Item onClick={() => setCategory("all")}> all </Dropdown.Item>
        </DropdownButton>
        <DropdownButton
          className="mt-2"
          title="sort"
        >
          <Dropdown.Item onClick={sortProductByPriceLowToHigh}> price -- low to high </Dropdown.Item>
          <Dropdown.Item onClick={sortProductByPriceHightToLow}> price -- high to low </Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  );
};

export default Filter;

