import React, { useContext } from "react";
import { Alert, Dropdown, DropdownButton } from "react-bootstrap";
import Product from "./Product";
import { ProductContext } from "../Context";



const ProductList = () => {
  const {
    products,
    setProductName,
    setCategory,
    category,
    setProducts
  } = useContext(ProductContext);
  const sortProductByPriceLowToHigh = () => {
    let data = [...products]
    setProducts(data.sort((a, b) => a.price - b.price));
  };

  const sortProductByPriceHightToLow = () => {
    let data = [...products]
    setProducts(data.sort((a, b) => b.price - a.price));
  };


  return (
    <div className="bg-secondary">
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
      <div className="d-flex flex-wrap justify-content-center m-auto">
        {
          products.length ?
            products.map((product) => (
              <Product
                key={product.id}
                product={product}
              />
            )) :
            <Alert variant="danger">
              sorry ! no results found!
            </Alert>
        }
      </div>
    </div >
  );
};

export default ProductList;

