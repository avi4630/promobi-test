import './App.css';
import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Cart from "./components/Cart";
import Default from "./components/Default";
import NavBar from "./components/NavBar";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";
import ProductProvider from "./Context";

const App = () => {
  return (
    <>
      <ProductProvider>
        <NavBar />
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/details" component={ProductDetails} />
          <Route path="/cart" component={Cart} />
          <Route component={Default} />
        </Switch>
      </ProductProvider>
    </>
  );
};

export default App;
