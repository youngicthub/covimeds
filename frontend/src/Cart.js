import React, { useEffect, useState } from "react";
import "./cart.css";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CheckClientAuth } from "./Auth/CheckAuth";
import { baseURL } from "./Admin/utils/url";

const Cart = ({ close, setClose, deleteCartItem }) => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const { clientisLoggedIn } = CheckClientAuth();

  const [cart, setCart] = useState([]);

  useEffect(() => {

    let carts_ = localStorage.getItem("cart");
      if (carts_ !== null) setCart(JSON.parse(carts_));
      
    let id = setInterval(() => {
      let carts_ = localStorage.getItem("cart");
      if (carts_ !== null) setCart(JSON.parse(carts_));
    }, 2000);
    return () => clearTimeout(id);
  }, []);

  let grandCart = cart.map((cur) => {
    cur.Price = parseInt(cur.Price);
    cur.subTotal = cur.price * cur.qty;
    return cur.subTotal;
  });

  const changeCartQuantity = (id, type) => {
    let newCart = cart.map((cur) => {
      if (cur.id === id && type == "inc") {
        cur.qty += 1;
      }

      if (cur.id === id && type == "dec" && cur.qty >= 2) {
        cur.qty = cur.qty - 1;
      }

      return cur;
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const onremoveCartItem = (id) => {
    let filteredCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(filteredCart));
  };

  return (
    <div className="cartContainer">
      {cart.length === 0 && (
        <div className="emptyCart">
          <h2 className="empty"> Cart is Empty </h2>
          <Link to="/product" className="emptyCartBtn">
            {" "}
            Shop Now
          </Link>
        </div>
      )}
      <div className="content2">
        {cart.map((curElm, index) => (
          <div className="cartItem2" key={index}>
            <div className="imgBox2">
              <img
                src={baseURL() + "/webStorage/product/" + curElm.image}
                alt={curElm.Title}
              />
            </div>
            <div className="details2">
              <div className="info">
                <h4> {curElm.category}</h4>
                <h3> {curElm.name} </h3>
                <p> Price: ${curElm.price}</p>
                <h5> {curElm.Qtn}</h5>
                <div className="qty">
                  <button
                    className="incqty"
                    onClick={() => changeCartQuantity(curElm.id, "inc")}
                  >
                    {" "}
                    +{" "}
                  </button>
                  <input type="text" value={curElm.qty}></input>
                  <button
                    className="decqty"
                    onClick={() => changeCartQuantity(curElm.id, "dec")}
                  >
                    {" "}
                    -{" "}
                  </button>
                </div>
                <h4 className="subTotal">
                  sub total: ${(curElm.price * curElm.qty).toLocaleString("en")}
                </h4>
              </div>
              <div className="close">
                <button
                  onClick={() => onremoveCartItem(curElm.id)}
                  className="closebtn"
                >
                  <IoCloseSharp />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <>
          <div className="grandtotal">
            <h3>
              {" "}
              Grand Total: ${" "}
              {(grandCart.reduce((a, b) => {
                return a + b;
              }, 0)).toLocaleString("en")}
            </h3>

            {clientisLoggedIn ? (
              <button className="checkout">
                {" "}
                <Link to="/billingform" className="checkoutLink">
                  {" "}
                  Checkout{" "}
                </Link>
              </button>
            ) : (
              <button className="checkout" style={{ backgroundColor: "red" }}>
                <Link to="/login" className="checkoutLink">
                  {" "}
                  Login{" "}
                </Link>
              </button>
            )}
          </div>

          {/* {isPaymentOpen && (
            <div className="paymentMethod">
              <p>Make Payment</p>
            </div>
          )} */}
        </>
      )}
    </div>
  );
};

export default Cart;
