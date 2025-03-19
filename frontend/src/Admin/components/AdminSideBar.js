import React from "react";
import {
  FaGofore,
  FaGoodreads,
  FaPowerOff,
  FaProductHunt,
  FaUser,
} from "react-icons/fa";
import { FaJediOrder, FaUsers } from "react-icons/fa6";
import { Link } from "react-router-dom";
import classes from "./AdminAside.module.css";

function AdminSideBar() {
  return (
    <div className={classes.sidebar}>
      <div>
        <div className={classes.product_list}>
          <Link to={"/admin-get-users"}>
            <FaUsers />
            <p>Users</p>
          </Link>
        </div>
        <div className={classes.product_list}>
          <Link to={"/admin-get-admins"}>
            <FaUsers />
            <p>Admin</p>
          </Link>
        </div>
        <div className={classes.product_list}>
          <Link to={"/admin-order-list"}>
            <FaJediOrder />
            <p>Orders</p>
          </Link>
        </div>

        <div className={classes.product_list}>
          <Link to={"/all-product"}>
            <FaProductHunt />
            <p>Products</p>
          </Link>
          <ul>
            {/* <li>
            <Link to={"/all-product"}>Product</Link>
          </li> */}
            <li>
              <Link to={"/admin-create-product"}>Create product</Link>
            </li>
          </ul>
        </div>

        <div className={classes.product_list}>
          <Link to={"/admin-category"}>
            <FaGoodreads />
            <p>Categories</p>
          </Link>
        </div>
      </div>

      <div>
        {/* <div className={classes.product_list}>
        <Link to={"/admin-login"}>
        <FaUser />
          <p>Account</p>
        </Link>
      </div> */}

        <div className={classes.product_list}>
          <Link to={"/admin-login"}>
            <FaPowerOff color="red" />
            <p style={{ color: "red" }}>Log out</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminSideBar;
