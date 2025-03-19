import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import Wrapper from "./components/Wrapper";
import { AccessToken } from "./utils/AccessToken";
import { baseURL } from "./utils/url";

function AdminCategory() {
  const [categories, setCategories] = useState([]);
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [enteredName, setEnteredName] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const apiUrl = baseURL() + "/categories";
    axios
      .get(apiUrl)
      .then((response) => {
        if (Array.isArray(response.data)) setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const onDeleteHandler = (id) => {
    const checkConfirm = window.confirm("Do you want to delete this category?");
    if (!checkConfirm) return;

    const apiUrl = baseURL() + "/category/" + id;
    axios
      .delete(apiUrl, {
        headers: {
          Authorization: "Bearer " + AccessToken(),
        },
      })
      .then((response) => {
        Swal.fire({
          title: "Deleted",
          text: "Category deleted successfully!",
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

  const onsubmitHandler = () => {
   const apiUrl = baseURL() + "/category/"
   if(enteredName.length < 1) return setError("Category name is required")
   axios
     .post(apiUrl,{
      name: enteredName
     }, {
       headers: {
         Authorization: "Bearer " + AccessToken(),
       },
     })
     .then((response) => {
       Swal.fire({
         title: "Created",
         text: "Category created successfully!",
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
  }

  return (
    <Wrapper>
      <div className="admn_sub_header">
        <h1>Categories</h1>
        <button onClick={() => setShowCreateCategory(true)}>Clreate</button>
      </div>
      <br />
      <br />
      <table className="admin-table">
        <thead className="admin-thead">
          <tr className="admin-tr">
            <th className="sn-x">S/N</th>
            <th>Category _id</th>
            <th>Name</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody className="admin-tbody">
          {categories.map((item, index) => {
            return (
              <tr className="admin-th">
                <td className="sn-x">{index + 1}</td>
                <td>{item._id}</td>
                <td>{item.name}</td>
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

      {showCreateCategory && (
        <div className="container_category_x">
          <div className="create_wrapper_category">
            <div>
              <FaTimes onClick={() => setShowCreateCategory(false)} />
            </div>
            <br />
            <input
              name="name"
              type={"text"}
              placeholder={"Enter category name"}
              onChange={(e) => setEnteredName(e.target.value)}
            />
            {error.length > 0
            
            &&
            <p>{error}</p>
            }
            <br />
            <button onClick={onsubmitHandler} className="admin-table-btn-edit">Create</button>
          </div>
        </div>
      )}
    </Wrapper>
  );
}

export default AdminCategory;
