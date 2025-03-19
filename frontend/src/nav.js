import React, { useEffect } from "react";
import { FaTruck } from "react-icons/fa";
// import { FaHeart } from "react-icons/fa";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
// import { IoBagAdd } from "react-icons/io5";
import { IoBagCheckOutline, IoCart } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
// import { CiLogin } from "react-icons/ci";
// import { IoMdLogOut } from "react-icons/io";
import "./nav.css";
import { Link } from "react-router-dom";

import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { CheckClientAuth } from "./Auth/CheckAuth";

export const Nav = ({ searchbtn }) => {

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState();
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const { clientisLoggedIn } = CheckClientAuth();

  const [cart, setCart] = useState("0");

  useEffect(() => {
    let id = setInterval(() => {
      let carts = localStorage.getItem("cart");
      if (carts !== null) setCart(JSON.parse(carts).length);
    }, 1000);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <div className="free">
        <div className="icon">
          <FaTruck />
        </div>
        <p>FREE shipping when upto $1000 orders</p>
      </div>

      <div className="mainHeader">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src="/covimeds.png" alt="logo" />
            </Link>
          </div>
          <div className="search">
            <input
              type="text"
              placeholder="Search your product ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoComplete="off"
            ></input>
            <button onClick={() => searchbtn(search)}> Search</button>
          </div>

          <div className="icon icon-wrapper">
            <div className="account">
              <div className="userIcon">
                {clientisLoggedIn ? (
                  <Link to="/myaccount" className="userIcon">
                    <FaRegUserCircle />
                  </Link>
                ) : (
                  <Link to="/login" className="userIcon">
                    <button className="login-button">Login</button>
                  </Link>
                )}
              </div>
            </div>

            <div className="icon2">
              {/* <Link to="/" className="link">
                <CiHeart size={25} />{" "}
              </Link> */}
              <Link to="/cart " className="link">
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <IoCart size={25} />

                  <div style={{
                    position: "absolute",
                    top: -20,
                    right: 5
                  }}>
                  <p className="setcart">{cart}</p>
                </div>
                </div>

                
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="header">
        <div className={`menu ${isMenuOpen ? "open" : ""}`}>
          <div className="containerHeader">
            <div className="nav">
              <ul>
                <li>
                  <Link to="/" className="linkNav">
                    {" "}
                    Home{" "}
                  </Link>
                </li>
                <li>
                  <Link to="/product" className="linkNav">
                    {" "}
                    Product{" "}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="linkNav">
                    {" "}
                    Contact{" "}
                  </Link>
                </li>
              </ul>

              <div className="menu-icon" onClick={toggleMenu}>
                <span className="bar">
                  {" "}
                  <IoIosMenu />{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
