import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ProductContext } from "../Context";

const NavBar = () => {
  const { cart } = useContext(ProductContext);
  return (
    <nav className="navbar sticky-top navbar-expand-sm bg-primary">
      <h3 className="font-weight-bold text-white">DigiMall</h3>
      <ul className="navbar-nav align-item-center">
        <li className="navbar-item ml-5">
          <Link to="/" className="nav-link bg-dark text-white rounded m-2 p-1">Products</Link>
        </li>
      </ul>
      <Link to="/cart" className="ml-auto">
        <Button variant="dark" className="rounded"> My Cart <span className="border bg-danger rounded-circle px-2">{cart.length}</span></Button>
      </Link>
    </nav>
  );
};

export default React.memo(NavBar);
