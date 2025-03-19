import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { GetAdmin } from "../Auth/userData";
import Wrapper from "./components/Wrapper";
import { AccessToken } from "./utils/AccessToken";
import { baseURL } from "./utils/url";

function AllAdmins() {
  const [users, serUsers] = useState([]);

  useEffect(() => {
    const apiUrl = baseURL() + "/admin/admin";
    axios
      .get(apiUrl, {
        headers: {
          Authorization: "Bearer " + AccessToken(),
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) serUsers(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const onDeleteHandler = (id) => {
    const checkConfirm = window.confirm("Do you want to delete this product?");
    if (!checkConfirm) return;

    const apiUrl = baseURL() + "/admin/delete/" + id;
    axios
      .delete(apiUrl, {
        headers: {
          Authorization: "Bearer " + AccessToken(),
        },
      })
      .then((response) => {
        Swal.fire({
          title: "Deleted",
          text: "Admin deleted successfully!",
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

  const { admin } = GetAdmin();

  return (
    <Wrapper>
      <div className='admn_sub_header'>
        <h1>
          {users.length} admin{users.length < 2 ? "" : "s"}{" "}
        </h1>
      </div>
      <br />
      <br />
      {/* <div className="table-main-wrapper"> */}
      <table className='admin-table'>
        <thead className='admin-thead'>
          <tr className='admin-tr'>
            <th className='sn-x'>S/N</th>
            <th>FullName</th>
            <th>Email</th>
            <th>Joined</th>
            <th>Delete</th>
            <th>Address</th>
            <th>Phone No</th>
          </tr>
        </thead>

        <tbody className='admin-tbody'>
          {users.map((item, index) => {
            return (
              <tr className='admin-th'>
                <td className='sn-x'>{index + 1}</td>
                <td>{item.fullName}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>

                <td>
                  {new Date(item.createdAt).toLocaleDateString()}{" "}
                  {new Date(item.createdAt).toLocaleTimeString()}
                </td>
                <td>
                  <button
                    onClick={() => onDeleteHandler(item._id)}
                    className='admin-table-btn'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* </div> */}
    </Wrapper>
  );
}

export default AllAdmins;
