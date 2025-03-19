import React, { useEffect, useState } from "react";
import "../account/myaccount.css";
import axios from "axios";
import { baseURL } from "../../Admin/utils/url";
import { clientAccessToken } from "../../Admin/utils/AccessToken";
import Swal from "sweetalert2";

const Myaccount = () => {
  const [hasSubmiitedBillingAddress, setHasSubmiitedBillingAddress] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    oldpassword: "",
    newPassword: "",
  });

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

        console.log("====>", response.data.fullName);

        setFormData((prevState) => {
          return {
            ...prevState,
            name: response.data.fullName,
          };
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const postData = {
      fullName: formData.name,
      password: formData.oldpassword,
      newPassword: formData.newPassword
    };

    axios
      .patch(baseURL() + "/account-update", postData, {
        headers: {
          Authorization: "Bearer " + clientAccessToken(),
        },
      })
      .then((response) => {
        // Handle the success response
        console.log("Response:", response.data);
        setIsSubmitting(false);
        setHasSubmiitedBillingAddress(true);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
        setIsSubmitting(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      });
  };

  return (
    <div id="billing-form-container">
      <div id="billing-form">
        <h2>Update your profile</h2>
        <form onSubmit={handleSubmit}>
          <div id="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData?.name}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div id="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleChange}
            required
          />
        </div> */}

          <div id="form-group">
            <label> Old Password</label>
            <input
              type="password"
              name="oldpassword"
              value={formData?.oldpassword}
              onChange={handleChange}
              required
            />
          </div>
          <div id="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData?.newPassword}
              onChange={handleChange}
              required
            />
          </div>

          {hasSubmiitedBillingAddress ? (
            <div>
              <p style={{ color: "green", fontWeight: "bold" }}>
                Account Details is updated
              </p>
            </div>
          ) : (
            <>
              {isSubmitting ? (
                <button type="submit" id="submit" disabled>
                  Please wait...
                </button>
              ) : (
                <button type="submit" id="submit">
                  Submit
                </button>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Myaccount;
