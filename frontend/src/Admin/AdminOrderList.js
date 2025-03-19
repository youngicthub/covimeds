import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Wrapper from "./components/Wrapper";
import { AccessToken } from "./utils/AccessToken";
import { baseURL } from "./utils/url";

function AdminOrderList() {
  const [products, seProducts] = useState([]);

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);

    const apiUrl = baseURL() + "/admin-order-list/" + url.get("order_id");

    axios
      .get(apiUrl, {
        headers: {
          Authorization: "Bearer " + AccessToken(),
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) seProducts(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const onEditOrderStatusHandler = (status) => {
    const url = new URLSearchParams(window.location.search);

    const checkConfirm = window.confirm("Do you want to edit this order?");
    if (!checkConfirm) return;

    const apiUrl = baseURL() + "/orders/";
    axios
      .patch(
        apiUrl,
        {
          order_id: url.get("order_id"),
          status: status,
        },
        {
          headers: {
            Authorization: "Bearer " + AccessToken(),
          },
        }
      )
      .then((response) => {
        Swal.fire({
          title: "Updated",
          text: "Order status changes successfully!",
          icon: "success",
        });

        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  const onDeleteHandler = () => {
    const url = new URLSearchParams(window.location.search);

    const checkConfirm = window.confirm(
      "Do you want to delete all these orders?"
    );
    if (!checkConfirm) return;

    const apiUrl = baseURL() + "/order_delete/" + url.get("order_id");

    axios
      .delete(apiUrl, {
         headers: {
            Authorization: "Bearer "+ AccessToken()
         }
      })
      .then((response) => {
        Swal.fire({
          title: "Deleted",
          text: "Order deleted successfully!",
          icon: "success",
        });

        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  return (
    <Wrapper>
      <div className="admn_sub_header">
        <h1>Orders</h1>

        <div>
          <button
            style={{ backgroundColor: "red" }}
            onClick={() => onEditOrderStatusHandler("pending")}
          >
            Pending
          </button>
          <button
            style={{ backgroundColor: "brown" }}
            onClick={() => onEditOrderStatusHandler("approved")}
          >
            Approved
          </button>
          <button
            style={{ backgroundColor: "green" }}
            onClick={() => onEditOrderStatusHandler("delivered")}
          >
            Delivered
          </button>
        </div>
      </div>
      <br />
      <div className="admn_sub_header">
        <div></div>
        <FaTrash color="red" onClick={onDeleteHandler} />
      </div>
      <br />
      <br />

      <table className="admin-table">
        <thead className="admin-thead">
          <tr className="admin-tr">
            <th className="sn-x">S/N</th>
            <th>Name</th>
            <th>Order id</th>
            <th>Description</th>
            <th>Price</th>
            <th>Status</th>
            <th>Image</th>
          </tr>
        </thead>

        <tbody className="admin-tbody">
          {products.map((item, index) => {
            return (
              <tr className="admin-th">
                <td className="sn-x">{index + 1}</td>
                <td>{item.order_id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.status}</td>
                <td>
                  <a
                    target={"_blank"}
                    href={baseURL() + "/webStorage/product/" + item.image}
                  >
                    <img
                      style={{
                        widows: 50,
                        height: 50,
                      }}
                      src={baseURL() + "/webStorage/product/" + item.image}
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

export default AdminOrderList;
