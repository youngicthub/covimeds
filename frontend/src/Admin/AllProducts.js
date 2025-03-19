import axios from "axios";
import React, { useEffect, useState } from "react";
import Wrapper from "./components/Wrapper";
import { baseURL } from "./utils/url";
import "./Styles/AdminGlobal.css";
import { AccessToken } from "./utils/AccessToken";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function AllProducts() {
  const [products, seProducts] = useState([]);

  useEffect(() => {
    const apiUrl = baseURL() + "/products";
    axios
      .get(apiUrl)
      .then((response) => {
        if (Array.isArray(response.data)) seProducts(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const onDeleteHandler = (id) => {
    const checkConfirm = window.confirm("Do you want to delete this product?");
    if (!checkConfirm) return;

    const apiUrl = baseURL() + "/product/" + id;
    axios
      .delete(apiUrl, {
        headers: {
          Authorization: "Bearer " + AccessToken(),
        },
      })
      .then((response) => {
        Swal.fire({
          title: "Deleted",
          text: "Product deleted successfully!",
          icon: "success",
        });


        window.location.reload()
      })
      .catch((error) => {
         console.log(error)
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
        <h1>
          {products.length} Product{products.length < 2 ? "" : "s"}{" "}
        </h1>
      </div>
      <br />
      <br />
      <table className="admin-table">
        <thead className="admin-thead">
          <tr className="admin-tr">
            <th className="sn-x">S/N</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Status</th>
            <th>Image</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody className="admin-tbody">
          {products.map((item, index) => {
            return (
              <tr className="admin-th">
                <td className="sn-x">{index + 1}</td>
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
                <td>
                  <button
                    onClick={() => onDeleteHandler(item._id)}
                    className="admin-table-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Wrapper>
  );
}

export default AllProducts;
