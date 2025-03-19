import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import OrderDetails from './Orderdetails'; // Correct case
import '../orders/orders.css';
import { clientAccessToken } from '../../Admin/utils/AccessToken';
import axios from 'axios';
import { baseURL } from '../../Admin/utils/url';
import {Link} from "react-router-dom"



const MyOrders = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const apiUrl = baseURL() + "/user-order";
    axios
      .get(apiUrl, {
        headers: {
          Authorization: "Bearer " + clientAccessToken(),
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      {/* <OrderTable /> */}
      <div className="admn_sub_header">
        <h1>Orders</h1>

        
      </div>
      <br />
      <br />
      <table className="admin-table">
        <thead className="admin-thead">
          <tr className="admin-tr">
            <th className="sn-x">S/N</th>
            <th>Order id</th>
            <th>FullName</th>
            <th>Email</th>
            <th>Status</th>
            <th>Order Date</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>

        <tbody className="admin-tbody">
          {orders.map((item, index) => {
            return (
              <tr className="admin-th">
                <td className="sn-x">{index + 1}</td>
                <td>{item.order_id}</td>
                <td>{item.user.fullName}</td>
                <td>{item.user.email}</td>
                <td>{item.status}</td>
                <td>
                  {new Date(item.createdAt).toLocaleDateString()}{" "}
                  {new Date(item.createdAt).toLocaleTimeString()}
                </td>
                {/* <td>
                  <Link to={"/admin-order-list-item?order_id="+ item.order_id}>
                    <button className="admin-table-btn-edit">View</button>
                  </Link>
                </td> */}

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
