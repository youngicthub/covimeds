import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { clientAccessToken } from "../../Admin/utils/AccessToken";
import { baseURL } from "../../Admin/utils/url";

import "../UserDashboard/accountdashboard.css";
import MyOrders from "../orders/Orders";
import { FaHouseUser } from "react-icons/fa";
import { FaCartFlatbed } from "react-icons/fa6";
import { MdEscalator } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa6";
import Myaccount from "../account/Myaccount";

const MyAccountDashboard = () => {
  const [user, setUser] = useState("");
  const [selectedLink, setSelectedLink] = useState(null);
  const [isMenuOpen, setMenuOpen] = useState(true);

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    axios
      .get(baseURL() + "/user", {
        headers: {
          Authorization: "bearer " + clientAccessToken(),
        },
      })
      .then((response) => {
        console.log("=====>", response);
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    let url = new URLSearchParams(window.location.search);

    if (url.get("type") === "order") {
      handleLinkClick("myorders");
    }
  }, []);

  useEffect(() => {
    let url = new URLSearchParams(window.location.search);

    if (url.get("type") === "account") {
      handleLinkClick("account");
    }
  }, []);

  return (
    <div className={`dashboard-container ${isMenuOpen ? "menu-open" : ""}`}>
      <nav className="side-nav">
        <button className="menu-toggle" onClick={toggleMenu}>
          &#9776; Dashboard
        </button>
        <ul>
          <li>
            <a href="#my-account">
              {" "}
              <FaHouseUser />
              User
            </a>
          </li>
          <li>
            <a
              href="#my-orders"
              onClick={() => handleLinkClick("myorders")}
              className="linkNav"
            >
              <FaCartFlatbed /> Orders
            </a>
          </li>
          <li>
            <a
              href="#account-details"
              onClick={() => handleLinkClick("account")}
            >
              {" "}
              <MdEscalator /> Update
            </a>
          </li>
          <li>
            <a
              href="/login"
              onClick={() => handleLinkClick("logout")}
              className="linkNav"
            >
              <FaPowerOff /> Logout
            </a>
          </li>
        </ul>
      </nav>

      <div className="main-content">
        <div id="my-account" className="tab-content">
          <h2>User </h2>
          <p>Welcome, {user.fullName}!</p>
          <p>
            From your account dashboard, you can view your recent orders, manage
            your shipping and billing addresses, <br />
            and edit your password and account details.
          </p>
        </div>

        {/* Content for My Orders */}
        <div id="my-orders" className="tab-content">
          {selectedLink === "myorders" && <MyOrders />}
        </div>

        {/* Content for Account Details */}
        <div id="account-details" className="tab-content">
          <h2>Update Account </h2>
          {selectedLink === "account" && <Myaccount />}
        </div>

        {/* Content for Logout */}
        <div id="logout" className="tab-content">
          {selectedLink === "logout" && <p></p>}
        </div>
      </div>
    </div>
  );
};

export default MyAccountDashboard;


