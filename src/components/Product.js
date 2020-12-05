import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { ProductContext } from "../Context";
import { Link } from "react-router-dom";
import Modal from "./AddCartModal";

const CardWrapper = styled(Card)`
  border-radius: 20px;
  width:300px;
  height: 500px;
`;

const CardImage = styled(Card.Img)`
  border-radius: 20px;
  height: 300px;
  margin: 0 auto 1em auto;
`;

const Product = ({ product }) => {
  const { id, title, price, imgUrl } = product;
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const {
    setProductDetails,
    setCart,
    cart,
    total,
    setTotal
  } = useContext(ProductContext);

  //check if product already is in cart
  const inCart = cart.find(cartItem => cartItem.product.id == id);

  //event handler for add to cart
  const addToCart = (product, quantity) => {
    let tempCart = [...cart];
    let cartItem = { product: product, quantity: quantity, total: product.price * quantity }
    tempCart.push(cartItem);
    setCart(tempCart);
    setTotal(total + cartItem.total);
    handleShow()
  };

  return (
    <>
      <Modal show={show} setShow={setShow} imgUrl={imgUrl} price={price} title={title} quantity={1} />
      <CardWrapper className=" m-2 bg-info">
        <Link to="/details">
          <CardImage variant="top" src={imgUrl} className="p-1" onClick={() => { setProductDetails(product) }} />
        </Link>
        <Card.Body >
          <Card.Title>{title.toUpperCase()}</Card.Title>
          <h5> ₹{price}</h5>
          <Card.Footer className="d-flex justify-content-around">
            {
              inCart ?
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={<Tooltip>Item Is Already In Cart</Tooltip>}
                >
                  <label className=" bg-primary p-2 rounded text-white">
                    In Cart
                  </label>
                </OverlayTrigger> :
                <Button onClick={() => addToCart(product, 1)}> Add To Cart</Button>
            }
          </Card.Footer>
        </Card.Body>
      </CardWrapper>
    </>
  );
};

export default React.memo(Product);
