import React, { useContext } from "react";
import { ProductContext } from "../Context";
import styled from "styled-components";
import { Button, Alert } from "react-bootstrap";

const Image = styled.img`
  border-radius: 20px;
  width:70px;
  height:70px;
  
`;

const Cart = () => {
  const { cart, setCart, products, setProducts, total, setTotal } = useContext(ProductContext);

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
    const tempProducts = [...products];
    const productIndex = tempProducts.findIndex(item => item.id == id);
    tempProducts[productIndex].inCart = false;
    setProducts(tempProducts);
  };

  //event handler for clear cart
  const clearCart = () => {
    let productIds = cart.map(cartItem => cartItem.product.id);
    const productIndex = [];
    products.map((item, index) => {
      if (productIds.includes(item.id))
        productIndex.push(index);
    });
    const tempProducts = [...products];
    productIndex.map(index => {
      tempProducts[index].inCart = false;
    });
    setProducts(tempProducts);
    setCart([]);
    setTotal(0);
  };

  return (
    <div>
      <table className="w-100 mt-2 d-none d-sm-block">
        <tr className="d-flex justify-content-around border rounded mx-4 py-2 bg-dark text-white">
          <th>PRODUCT</th>
          <th>PRODUCT NAME</th>
          <th>PRICE</th>
          <th>QUANTITY</th>
          <th>REMOVE</th>
          <th>TOTAL</th>
        </tr>
        {cart.length ?
          cart.map(({ product, quantity, total }) => (
            <tr className="d-flex justify-content-around py-2 border rounded mx-4 my-2 align-items-center bg-info font-weight-bold">
              <td><Image src={product.imgUrl} /></td>
              <td><span>{product.title}</span></td>
              <td><span>₹{product.price}</span></td>
              <td>
                <Button variant="dark" size="sm" className="mr-1" onClick={() => decreaseProductQuantity(product.id)}>-</Button>
                <Button variant="light">{quantity}</Button>
                <Button variant="dark" size="sm" className="ml-1" onClick={() => increaseProductQuantity(product.id)}>+</Button>
              </td>
              <td><Button variant="danger" size="sm" onClick={() => removeProductFromCart(product.id)}>Delete</Button></td>
              <td><span>₹{total}</span></td>
            </tr>
          ))
          :
          <Alert variant="danger" className="text-center mt-2">
            Your Cart Is Currently Empty
        </Alert>
        }
      </table>
      <div className="d-block d-sm-none d-flex flex-wrap justify-content-center ">
        {cart.length ?
          cart.map(({ product, quantity, total }) => (
            <div className="d-flex flex-column bg-info m-2 px-3 border rounded">
            <Image src={product.imgUrl} />
            <span>{product.title}</span>
            <div>
              <Button variant="dark" size="sm" className="mr-1" onClick={() => decreaseProductQuantity(product.id)}>-</Button>
                <Button variant="light">{quantity}</Button>
                <Button variant="dark" size="sm" className="ml-1" onClick={() => increaseProductQuantity(product.id)}>+</Button>
            </div>
            <Button variant="danger" size="sm" onClick={() => removeProductFromCart(product.id)}>Delete</Button>
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
        </div>

      }
    </div>
  );
};

export default React.memo(Cart);
