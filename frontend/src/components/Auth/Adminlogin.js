import React, { useEffect } from "react";
import "../Auth/login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { setAdminToken } from "../../Auth/setToken";
import { baseURL } from "../../Admin/utils/url";

const Adminlogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    window.localStorage.removeItem("admin-token");
  }, []);
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onLoginHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const postData = {
      email: formData.email,
      password: formData.password,
    };

    axios
      .post(baseURL() + "/admin/login", postData)
      .then((response) => {
        console.log(response);
        // Handle the success response
        // console.log("Response:", response.data);
        setIsSubmitting(false);
        setAdminToken(response.data.user.token);

        window.location.href = "/admin-get-users";
      })
      .catch((error) => {
        console.error("Error:", error);
        // setError(error.response.data.message);
        setIsSubmitting(false);
      });
  };

  return (
    <div className='login'>
      <div className='loginContainer'>
        <div className='loginForm'>
          <form method='' onSubmit={onLoginHandler}>
            <div className='loinLogo'>
              <Link to='/'>
                {" "}
                <img src='/covimeds.png' to alt='logo' />{" "}
              </Link>
              <h2> Admin Login </h2>
              {error.length > 0 && <p style={{ color: "red" }}>{error}</p>}
            </div>
            <input
              type='Email'
              placeholder='Enter your Email'
              required
              value={formData.email}
              onChange={handleChange}
              name='email'
            />
            <input
              type='password'
              placeholder='Enter your Password'
              required
              name='password'
              value={formData.password}
              onChange={handleChange}
            />
            <div className='forgotSign'>
              <Link to='/forgotpassword' className='link'>
                {" "}
                Forgot Password?
              </Link>
              <p>
                New Admin
                <Link to='/adminsignup' className='p'>
                  {" "}
                  Sign up
                </Link>
              </p>
            </div>
            {!isSubmitting ? (
              <button type='Submit' id='sutmitBTN'>
                {" "}
                Login{" "}
              </button>
            ) : (
              <button type='Submit' id='sutmitBTN' disabled>
                {" "}
                Please wait...{" "}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Adminlogin;
