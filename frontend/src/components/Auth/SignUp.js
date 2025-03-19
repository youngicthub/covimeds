import React, { useEffect, useState } from "react";
import "../Auth/signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../Admin/utils/url";
import { setUserToken } from "../../Auth/setToken";

const SignUp = () => {
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.localStorage.removeItem("user-token");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleCheckboxChange = (e) => {
    setIsTermsAccepted(!isTermsAccepted);
  };

  const handleSubmit = (e) => {
    // Check if terms are accepted before proceeding
    if (!isTermsAccepted) {
      alert("Please accept the terms and conditions to register.");
      return;
    }
  };

  const [error, setError] = useState("");

  const onSignupHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const saveData = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    };

    axios
      .post(baseURL() + "/signup", saveData)
      .then((response) => {
        console.log(response.data.user.token);
        setUserToken(response.data.user.token);
        window.location.href = "/myaccount";
        alert("You have successfully registered");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error.response.data.message);
        setError(error.response.data.message);
      });
  };

  return (
    <div className='sign'>
      <div className='signContainer'>
        <div className='signForm'>
          <form onSubmit={onSignupHandler}>
            <div className='signLogo'>
              <Link to='/'>
                <img src='/covimeds.png' alt='logo' />
              </Link>
              <h2>Register New User</h2>

              {error.length > 0 && <p style={{ color: "red" }}>{error}</p>}
            </div>
            <input
              type='text'
              placeholder='Enter your FullName'
              value={formData.fullName}
              onChange={handleChange}
              required
              name='fullName'
            />
            <input
              type='email'
              placeholder='Enter your Email'
              value={formData.email}
              onChange={handleChange}
              required
              name='email'
            />
            <input
              type='password'
              placeholder='Enter your Password'
              value={formData.password}
              onChange={handleChange}
              required
              name='password'
            />
            <div className='termsCheckbox'>
              <div className='termsCheckbox1'>
                <input
                  type='checkbox'
                  id='termsCheckbox'
                  checked={isTermsAccepted}
                  onChange={handleCheckboxChange}
                  required
                />
              </div>
              <div className='termsCheckbox1'>
                <label htmlFor='termsCheckbox'>
                  I accept the terms and conditions
                </label>
              </div>
            </div>

            <div className='newser'>
              <p>
                Have an Account?
                <Link to='/login' className='signP'>
                  Login
                </Link>
              </p>
            </div>

            <>
              {isSubmitting ? (
                <button type='signsubmit' className='sutmitBTN' disabled>
                  Wait ...
                </button>
              ) : (
                <button type='signsubmit' className='sutmitBTN'>
                  Sign up
                </button>
              )}
            </>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
