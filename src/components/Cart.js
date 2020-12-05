import React, { useContext, useState } from "react";
import { ProductContext } from "../Context";
import styled from "styled-components";
import { Button, Alert } from "react-bootstrap";
import Modal from "./PlaceOrderModal";
import { Link } from "react-router-dom";
import { MinLimitModal, MaxLimitModal } from "./LimitExceedsModal";

const Image = styled.img`
  border-radius: 20px;
  width:70px;
  height:70px;
`;

const Cart = () => {
  const { cart, setCart, total, setTotal, setProductDetails } = useContext(ProductContext);
  const [show, setShow] = useState(false);
  const [minModalShow, setMinModalShow] = useState(false);
  const [maxModalShow, setMaxModalShow] = useState(false);
  const handleShow = () => setShow(true);

  //function for get total count
  const getTotal = (cart) => {
    let total = 0;
    cart.map(product => total += product.total);
    return total;
  };

  //event handler for decrease product quantity
  const decreaseProductQuantity = (id) => {
    const tempCart = [...cart];
    tempCart.map(cartItem => {
      if (cartItem.product.id == id) {
        setMinModalShow(!(cartItem.quantity > 1))
        cartItem.quantity = cartItem.quantity <= 1 ? cartItem.quantity : cartItem.quantity - 1;
        cartItem.total = cartItem.quantity * cartItem.product.price;
        return cartItem;
      }
      return cartItem
    });
    setCart(tempCart);
    setTotal(getTotal(cart));
  };

  //event handler for increase product quantity
  const increaseProductQuantity = (id) => {
    const tempCart = [...cart];
    tempCart.map(cartItem => {
      if (cartItem.product.id == id) {
        setMaxModalShow(!(cartItem.quantity < 3 && cartItem.quantity < cartItem.product.quantity));
        cartItem.quantity = (cartItem.quantity < 3 && cartItem.quantity < cartItem.product.quantity) ?
          cartItem.quantity + 1 :
          cartItem.quantity;
        cartItem.total = cartItem.quantity * cartItem.product.price;
        return cartItem;
      }
      return cartItem
    })
    setCart(tempCart);
    setTotal(getTotal(cart));
  };

  //event handler for remove item from cart
  const removeProductFromCart = (id) => {
    const tempCart = cart.filter(cartItem => cartItem.product.id != id);
    setCart(tempCart);
    setTotal(getTotal(tempCart));
  };

  //event handler for clear cart
  const clearCart = () => {
    setCart([]);
    setTotal(0);
  };

  //event handler for place order
  const placeOrder = () => {
    setTotal(0);
    setCart([]);
    handleShow()
  };

  return (
    <div>
      <Modal show={show} setShow={setShow} />
      <MinLimitModal show={minModalShow} onHide={() => setMinModalShow(false)} />
      <MaxLimitModal show={maxModalShow} onHide={() => setMaxModalShow(false)} />
      <div className="w-100 mt-2 d-none d-sm-block">
        <div className="d-flex justify-content-around border rounded mx-4 py-2 bg-dark text-white">
          <h4>PRODUCT</h4>
          <h4>PRODUCT NAME</h4>
          <h4>PRICE</h4>
          <h4>QUANTITY</h4>
          <h4>REMOVE</h4>
          <h4>TOTAL</h4>
        </div>
        {cart.length ?
          cart.map(({ product, quantity, total }) => (
            <div
              key={product.id}
              className="d-flex justify-content-around py-2 border rounded mx-4 my-2 align-items-center bg-info font-weight-bold"
            >
              <Link to="/details">
                <Image src={product.imgUrl} onClick={() => { setProductDetails(product) }} />
              </Link>
              <span>{product.title}</span>
              <span>₹{product.price}</span>
              <div>
                <Button variant="dark" size="sm" className="mr-1" onClick={() => decreaseProductQuantity(product.id)}>-</Button>
                <Button variant="light">{quantity}</Button>
                <Button variant="dark" size="sm" className="ml-1" onClick={() => increaseProductQuantity(product.id)}>+</Button>
              </div>
              <Button variant="danger" size="sm" onClick={() => removeProductFromCart(product.id)}>Delete</Button>
              <span>₹{total}</span>
            </div>
          ))
          :
          <Alert variant="danger" className="text-center mt-2">
            Your Cart Is Currently Empty
        </Alert>
        }
      </div>
      <div className="d-block d-sm-none d-flex flex-wrap justify-content-center ">
        {cart.length ?
          cart.map(({ product, quantity, total }) => (
            <div key={product.id} className="d-flex flex-column bg-info m-2 px-3 border rounded">
              <Link to="/details">
                <Image src={product.imgUrl} onClick={() => { setProductDetails(product) }} />
              </Link>
              <span>{product.title}</span>
              <div>
                <Button variant="dark" size="sm" className="mr-1" onClick={() => decreaseProductQuantity(product.id)}>-</Button>
                <Button variant="light">{quantity}</Button>
                <Button variant="dark" size="sm" className="ml-1" onClick={() => increaseProductQuantity(product.id)}>+</Button>
              </div>
              <Button variant="danger" size="sm" onClick={() => removeProductFromCart(product.id)}>Remove</Button>
              <span>₹{total}</span>
            </div>
          )) :
          <Alert variant="danger" className="text-center mt-2">
            Your Cart Is Currently Empty
        </Alert>
        }

      </div>
      {cart.length != 0 &&
        <div>
          <div className="d-flex justify-content-end">
            <Button
              className="mr-5 mb-2 border border-danger text-danger bg-white"
              onClick={clearCart}
            >
              CLEAR CART
            </Button>
          </div>
          <div className="d-flex justify-content-end">
            <h4 className="mr-5 mb-3 font-italic font-weight-bold border rounded p-1 bg-success">GRAND TOTAL : ₹{total}</h4>
          </div>
          <div className="text-center">
            <Button
              className="mb-2 border border-danger"
              variant="warning"
              onClick={placeOrder}
            >
              PLACE ORDER
            </Button>
          </div>
        </div>

      }
    </div>
  );
};

export default React.memo(Cart);
