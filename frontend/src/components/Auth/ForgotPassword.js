import React, { useEffect, useState } from "react";
import "../Auth/forgot.css";
import { Link } from "react-router-dom";
import { baseURL } from "../../Admin/utils/url";
import axios from "axios";
import Swal from "sweetalert2";

const ForgottenPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("")
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    console.log("Hey.....");

    if (email.length < 1) return alert("Please input your email address.");

    setIsSubmitting(true);

    axios
      .post(baseURL() + "/forgot-password", {
        email,
      })
      .then((response) => {
        setIsSubmitting(false);      
        Swal.fire({
          title: "Email sent",
          text: "A password reset email has been dispatched to your email account. Kindly check your email for further instructions. Thank you.",
          icon: "success",
        });
      
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
        <h2>Forgotten Password</h2>
        <div className="forgotPWD1">
          <form onSubmit={onSubmitHandler}>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
            />

{error.length > 0 && <p style={{
   color: "red",
   fontWeight: "bolder",
   textAlign: "center"
}}> {error}</p>}

{!isSubmitting ? (
              <button>Reset Password</button>
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

export default ForgottenPassword;
