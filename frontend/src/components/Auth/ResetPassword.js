import React, { useEffect, useState } from "react";
import "../Auth/forgot.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../Admin/utils/url";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log("Hey.....")

    if (password.length < 1)
      return alert("Please input your password.");

    setIsSubmitting(true);

    let url = new URLSearchParams(window.location.search);

    let token = url.get("token");

    axios
      .post(baseURL() + "/reset-password", {
        newPassword: password,
        token,
      })
      .then((response) => {
        setIsSubmitting(false);
        alert("Your password reset was succesful");
        window.location.href = "/login";
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error.response.data.error);
        setError(error.response.data.error);
        setIsSubmitting(false);
      });
  };

  return (
    <section>
      <div className="forgotPWD">
        <h2>Reset password</h2>
        <div className="forgotPWD1">
          <form onSubmit={onSubmitHandler}>
            <input
              type="password"
              value={password}
              onChange={handleEmailChange}
              placeholder="Enter your new password"
              required
            />

{error.length > 0 && <p style={{
   color: "red",
   fontWeight: "bolder",
   textAlign: "center"
}}> {error}</p>}

            {!isSubmitting ? (
              <button>Update</button>
            ) : (
              <button disabled>
                Please wait...
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="backtoLogin">
        <Link to="/login" className="link">
          {" "}
          Back to Login{" "}
        </Link>
      </div>
    </section>
  );
};

export default ResetPassword;
