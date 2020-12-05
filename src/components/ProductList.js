import React, { useContext } from "react";
import { Alert, Dropdown, DropdownButton } from "react-bootstrap";
import Product from "./Product";
import { ProductContext } from "../Context";
import Filter from "./Filter";

const ProductList = () => {
  const { products } = useContext(ProductContext);

  return (
    <div className="bg-secondary">
      <Filter />
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
