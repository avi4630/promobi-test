import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";
import { getProducts } from "./response";
import { Spinner, Alert } from "react-bootstrap";

const ProductContext = React.createContext();

const ProductProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [category, setCategory] = useState("all");
  const [productName, setProductName] = useState("");
  const [productDetails, setProductDetails]=useState({});
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getProducts()
      .then(data => {
        setIsLoading(false);
        if (category == "all")
          setProducts(data.filter(product => product.title.includes(productName)));
        else
          setProducts(data.filter(product => product.category == category && product.title.includes(productName)));
      })
      .catch((err) => {console.log(err)
        setIsLoading(false);
        setIsError(true);
      });
  }, [category, productName]);

  if (isLoading) return <Spinner animation="border" />;
  if (isError) return (
    <Alert variant="danger">
      oops ! something went wrong
      </Alert>
  );

  return (
    <>
      <ProductContext.Provider 
      value={{
        products: products,
        setCategory:setCategory,
        setProductName:setProductName,
        category: category,
        setProducts:setProducts,
        productDetails:productDetails,
        setProductDetails:setProductDetails,
        cart:cart,
        setCart:setCart,
        total:total,
        setTotal:setTotal
        }}>
        {props.children}
      </ProductContext.Provider>
    </>
  );
}

export default ProductProvider;
export { ProductContext };
