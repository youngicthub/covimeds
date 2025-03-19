import React, { useEffect } from "react";
import "../Auth/login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { setUserToken } from "../../Auth/setToken";
import { baseURL } from "../../Admin/utils/url";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.localStorage.removeItem("user-token");
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setIsSubmitting(false);
  };

  const onLoginHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const postData = {
      email: formData.email,
      password: formData.password,
    };

    axios
      .post(baseURL() + "/login", postData)
      .then((response) => {
        setIsSubmitting(false);
        console.log(response.data.user.token);
        setUserToken(response.data.user.token);
        window.location.href = "/myaccount";
        alert("Login Sucessful");
      })
      .catch((error) => {
        setIsSubmitting(false);
        // Handle errors
        console.error("Error:", error.response.data.message);
        setError(error.response.data.message);
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
              <h2> User Login </h2>
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
                New User
                <Link to='/signup' className='p'>
                  {" "}
                  Sign up
                </Link>
              </p>
            </div>
            <>
              {isSubmitting ? (
                <button type='submit' id='submit' disabled>
                  wait...
                </button>
              ) : (
                <button type='Submit' id='sutmitBTN'>
                  {" "}
                  Login{" "}
                </button>
              )}
            </>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
