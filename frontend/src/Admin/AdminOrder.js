import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Wrapper from "./components/Wrapper";
import { AccessToken } from "./utils/AccessToken";
import { baseURL } from "./utils/url";

function AdminOrder() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const apiUrl = baseURL() + "/order_by_status";
    axios
      .get(apiUrl, {
        headers: {
          Authorization: "Bearer " + AccessToken(),
        },
      })
      .then((response) => {

        console.log("=====>", response.data)
        if (Array.isArray(response.data)) setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);


  return (
    <Wrapper>
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
            <th>Action</th>
            <th>Payment receipt</th>
          </tr>
        </thead>

        <tbody className="admin-tbody">
          {categories.map((item, index) => {
            return (
              <tr className="admin-th">
                <td className="sn-x">{index + 1}</td>
                <td>{item.order_id}</td>
                <td>{item.user?.fullName}</td>
                <td>{item.user?.email}</td>
                <td>{item.status}</td>
                <td>
                  {new Date(item.createdAt).toLocaleDateString()}{" "}
                  {new Date(item.createdAt).toLocaleTimeString()}
                </td>
                <td>
                  <Link to={"/admin-order-list-item?order_id="+ item.order_id}>
                    <button className="admin-table-btn-edit">View</button>
                  </Link>
                </td>

                <td>
                <a
                    target={"_blank"}
                    href={baseURL() + "/webStorage/receipt/" + item.receipt}
                  >
                    <img
                      style={{
                        widows: 50,
                        height: 50,
                      }}
                      src={baseURL() + "/webStorage/receipt/" + item.receipt}
                    />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Wrapper>
  );
}

export default AdminOrder;
