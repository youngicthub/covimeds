import React, { useEffect, useState } from "react";
import Wrapper from "./components/Wrapper";
import classes from "./Styles/CreateProduct.module.css";
import { baseURL } from "./utils/url";
import axios from "axios";
import Swal from 'sweetalert2'


import { AccessToken } from "./utils/AccessToken";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  let [categories, setCategories] = useState([]);
  const navigate  = useNavigate()

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

  const [enteredFormData, setFormData] = useState({
    category_id: "",
    name: "",
    description: "",
    price: "",
    status: "",
    upload: "",
  });

  const onInputChangeHandler = (e) => {
    setFormData((prevstate) => {
      return {
        ...prevstate,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onImageHandler = (e) => {
    setFormData((prevstate) => {
      return {
        ...prevstate,
        [e.target.name]: e.target.files[0],
      };
    });
  };

  

  const onCreateHandler = (e) => {
    e.preventDefault();

    const apiUrl = baseURL() + "/product";

    let formData = new FormData();
    formData.append("category_id", enteredFormData.category_id);
    formData.append("name", enteredFormData.name);
    formData.append("description", enteredFormData.description);
    formData.append("status", enteredFormData.status);
    formData.append("price", enteredFormData.price);
    formData.append("upload", enteredFormData.upload);

    axios
      .post(apiUrl, formData, {
        headers: {
          Authorization: "Bearer " + AccessToken(),
        },
      })
      .then((response) => {
         Swal.fire({
            title: "Good job!",
            text: "Product created successfully!",
            icon: "success"
          });

        navigate("/all-product")

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Wrapper>
      <form method="post" action={"#"} onSubmit={onCreateHandler}>
        <h1>Create Product</h1>
        <br />
        <div className={classes.wrapper_input}>
          <select name="category_id" onChange={onInputChangeHandler} required>
            <option value={""}>Select Category</option>
            {categories.map((cur, index) => {
              return (
                <option key={index} value={cur._id}>
                  {cur.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className={classes.wrapper_input}>
          <input
            name="name"
            placeholder="Product name"
            required
            onChange={onInputChangeHandler}
          />
        </div>
        <div className={classes.wrapper_input}>
          <input
            type={"number"}
            name="price"
            placeholder="Enter price"
            required
            onChange={onInputChangeHandler}
          />
        </div>

        <div className={classes.wrapper_input}>
          <textarea
            name="description"
            placeholder="Enter product description"
            onChange={onInputChangeHandler}
            required
          ></textarea>
        </div>

        <div className={classes.wrapper_input}>
          <select name="status" onChange={onInputChangeHandler} required>
            <option value={""}>Product Status</option>
            <option value={"active"}>Active</option>
            <option value={"inactive"}>Inactive</option>
          </select>{" "}
        </div>

        <div className={classes.wrapper_input}>
          <input
            name="upload"
            type={"file"}
            onChange={onImageHandler}
            accept="image/*"
            required
          />
        </div>

        <div className={classes.create_btn}>
          <button>Create</button>
        </div>
      </form>
    </Wrapper>
  );
}

export default CreateProduct;
