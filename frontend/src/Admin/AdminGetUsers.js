import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Wrapper from "./components/Wrapper";
import { AccessToken } from "./utils/AccessToken";
import { baseURL } from "./utils/url";

function AdminGetUsers() {
  const [users, serUsers] = useState([]);

  useEffect(() => {
    const apiUrl = baseURL() + "/users";
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
    const checkConfirm = window.confirm("Do you want to delete this user?");
    if (!checkConfirm) return;

    const apiUrl = baseURL() + "/user/" + id;
    axios
      .delete(apiUrl, {
        headers: {
          Authorization: "Bearer " + AccessToken(),
        },
      })
      .then((response) => {
        Swal.fire({
          title: "Deleted",
          text: "User deleted successfully!",
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
      <div className='admn_sub_header'>
        <h1>
          {users.length} user{users.length < 2 ? "" : "s"}{" "}
        </h1>
      </div>
      <br />
      <br />
      <table className='admin-table'>
        <thead className='admin-thead'>
          <tr className='admin-tr'>
            <th className='sn-x'>S/N</th>
            <th>FullName</th>
            <th>Email</th>
            <th>Joined</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody className='admin-tbody'>
          {users.map((item, index) => {
            return (
              <tr className='admin-th'>
                <td className='sn-x'>{index + 1}</td>
                <td>{item.fullName}</td>
                <td>{item.email}</td>

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
    </Wrapper>
  );
}

export default AdminGetUsers;
