import React from "react";
import { BrowserRouter } from "react-router-dom";
import Rout from "./rout";
import { Nav } from "./nav";
import Productdetails from "./Productdetails";
import { useState } from "react";

import Footer from "./HomeFooter";
import LiveChat from "./LiveChat";

const App = () => {
  // Add to cart
  const [cart, setCart] = useState([]);
  // Product details
  const [close, setClose] = useState(false);
  const [details, setDetails] = useState([]);
  // Filter products
  const [product, setProduct] = useState(Productdetails);
  const searchbtn = (product) => {
    const change = Productdetails.filter((x) => {
      return x.Cat === product;
    });

    setProduct(change);
  };

  // Product detals
  const view = (product) => {
    setDetails([{ ...product }]);
    setClose(true);
  };

  // Add to cart

  const addtoCart = (product) => {
    const exit = cart.find((x) => {
      return x.id === product.id;
    });

    if (exit) {
      alert("This Product is already added to cart");
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
      alert("Product is added to cart");
    }
  };

  const changeCartQuantity = (id, type) => {
    let newCart = cart.map((cur) => {
      if (cur.id === id && type == "inc") {
        cur.qty += 1;
      }

      if (cur.id === id && type == "dec" && cur.qty >= 1) {
        cur.qty = cur.qty - 1;
      }

      return cur;
    });

    setCart(newCart);
  };

  // Delete item
  const deleteCartItem = (_id) => {
    let filteredItem = cart.filter((item) => item.id !== _id);
    setCart(filteredItem);
  };

  return (
    <>
      <BrowserRouter>
        <Nav searchbtn={searchbtn} />
        <Rout
          product={product}
          setProduct={setProduct}
          details={details}
          view={view}
          close={close}
          setClose={setClose}
          cart={cart}
          setCart={setCart}
          addtoCart={addtoCart}
          changeCartQuantity={changeCartQuantity}
          deleteCartItem={deleteCartItem}
        />
        <LiveChat />
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
