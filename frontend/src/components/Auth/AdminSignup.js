import React, { useEffect, useState } from "react";
import "../Auth/signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { setAdminToken } from "../../Auth/setToken";
import { baseURL } from "../../Admin/utils/url";

const AdminSignUp = () => {
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    secret: "",
  });

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setIsTermsAccepted(!isTermsAccepted);
  };



  const [error, setError] = useState("");

  useEffect(() => {
    window.localStorage.removeItem("admin-token");
  }, []);

  const onSignupHandler = (e) => {
    e.preventDefault();

    setIsSubmitting(true);


    const saveData = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      secret: formData.secret,
    };

    axios
      .post(baseURL() + "/admin/signup", saveData)
      .then((response) => {
        setIsSubmitting(false);
        console.log(response);
        setAdminToken(response.data.user.token);
        window.location.href = "/admin-get-users";
      })
      .catch((error) => {
        // Handle errors
        console.log("Error",error)
        setIsSubmitting(false);
        // console.error("Error:", error.response.data.message);
        setError(error.response.data.message);
      });
  };

  return (
    <div className="sign">
      <div className="signContainer">
        <div className="signForm">
          <form onSubmit={onSignupHandler}>
            <div className="signLogo">
              <Link to="/">
                <img src="/covimeds.png" alt="logo" />
              </Link>
              <h2>Register New Admin</h2>

              {error.length > 0 && <p style={{ color: "red" }}>{error}</p>}
            </div>
            <input
              type="text"
              placeholder="Enter your FullName"
              value={formData.fullName}
              onChange={handleCheckboxChange}
              required
              name="fullName"
            />
            <input
              type="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleCheckboxChange}
              required
              name="email"
            />
            <input
              type="text"
              placeholder="Enter Secret key"
              value={formData.secret}
              onChange={handleCheckboxChange}
              required
              name="secret"
            />
            <input
              type="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={handleCheckboxChange}
              required
              name="password"
            />
            <div className="termsCheckbox">
              <div className="termsCheckbox1">
                <input
                  type="checkbox"
                  id="termsCheckbox"
                  checked={isTermsAccepted}
                  onChange={handleCheckboxChange}
                  required
                />
              </div>
              <div className="termsCheckbox1">
                <label htmlFor="termsCheckbox">
                  I accept the terms and conditions
                </label>
              </div>
            </div>

            <div className="newser">
              <p>
                Have an Account?
                <Link to="/adminlogin" className="signP">
                  Login
                </Link>
              </p>
            </div>
            {!isSubmitting ? (
              <button className="sutmitBTN">Sign up</button>
            ) : (
              <button disabled className="sutmitBTN">
                Please wait...
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSignUp;
