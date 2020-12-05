import React, { useContext, useState } from "react";
import { ProductContext } from "../Context";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Card, Button, Alert, OverlayTrigger, Tooltip } from "react-bootstrap";
import QuantityOptions from "./QuantityOptions";
import Modal from "./AddCartModal";

const CardWrapper = styled(Card)`
  border-radius: 20px;
  width:600px;
`;

const CardImage = styled(Card.Img)`
  border-radius: 20px;
  width:200px;
  height:200px;
  margin: 0 auto 1em auto;
`;

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);
  const { productDetails, cart, setCart, setTotal, total } = useContext(ProductContext);
  const handleShow = () => setShow(true);
  const { id, imgUrl, title, price, quantity: availableQuantity, info } = productDetails;
  const inCart = cart.find(cartItem => cartItem.product.id == id);

  //event handler for add to cart
  const addToCart = (product, quantity) => {
    let tempCart = [...cart];
    let cartItem = { product: product, quantity: quantity, total: product.price * quantity }
    tempCart.push(cartItem);
    setCart(tempCart);
    setTotal(total + cartItem.total);
    handleShow();
  };

  if (!Object.keys(productDetails).length)
    return (
      <Alert variant="danger" className="text-center mt-2">
        Product Not Selected
        </Alert>
    );
  return (
    <div className="d-flex justify-content-center">
      <Modal show={show} setShow={setShow} imgUrl={imgUrl} price={price} title={title} quantity={quantity} />
      <CardWrapper className="m-2 bg-secondary">
        <Card.Body >
          <div className="row">
            <div className="col">
              <CardImage src={imgUrl} className="bg-white mt-1 col border p-0" />
              <h4 className="border text-center mx-5 py-1 bg-success rounded"> ₹{price}</h4>
            </div>
            <div className="col">
              <Card.Title>{title.toUpperCase()}</Card.Title>
              <Card.Text>{info}</Card.Text>
            </div>
          </div>
          <div className="d-flex justify-content-around border py-1 bg-info rounded">
            <h5> Available Quantity : {availableQuantity}</h5>
            <QuantityOptions quantity={quantity} availableQuantity={availableQuantity} setQuantity={setQuantity} />
          </div>
          <Card.Footer>
            <div className="text-center">
              <Link to="/">
                <Button>Back To Product List</Button>
              </Link>
            </div>
            <div className="text-center mt-2">
              {
                inCart ?
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={<Tooltip>Item Is Already In Cart</Tooltip>}
                  >
                    <Link to="/cart">
                      <label className=" bg-warning p-2 rounded text-dark">
                        Go To Cart
                      </label>
                    </Link>
                  </OverlayTrigger> :
                  <Button variant="warning" onClick={() => addToCart(productDetails, quantity)}> Add To Cart</Button>
              }
            </div>
          </Card.Footer>
        </Card.Body>
      </CardWrapper>
    </div>
  );
};

export default React.memo(ProductDetails);
