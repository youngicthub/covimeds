import React, { useState } from "react";
import "./contact.css";

const Contacts = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="contact-container">
      {/* Left Side: Contact Info */}
      <div className="contact-info">
        <h1>Contact Us</h1>
        <p>Email, call, or complete the form to learn how we can help.</p>
        <p><strong>Email:</strong> info@snappy.io</p>
        <p><strong>Phone:</strong> 321-221-231</p>
        <a href="#">Customer Support</a>

        <div className="info-sections">
          <div>
            <h3>Customer Support</h3>
            <p>Our support team is available 24/7 for any queries.</p>
          </div>
          <div>
            <h3>Feedback & Suggestions</h3>
            <p>We value your feedback to improve our service.</p>
          </div>
          <div>
            <h3>Media Inquiries</h3>
            <p>Email us at media@snappyapp.com for press inquiries.</p>
          </div>
        </div>
      </div>

      {/* Right Side: Contact Form */}
      <div className="contact-form">
        <h2>Get in Touch</h2>
        <p>You can reach us anytime</p>
        <form method="POST">
          <div className="name-fields">
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              placeholder="First Name"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              placeholder="Last Name"
              required
              onChange={handleChange}
            />
          </div>
          <input
            type="email"
            name="email"
            value={user.email}
            placeholder="Your Email"
            required
            onChange={handleChange}
          />
          <div className="phone-field">
            <select>
              <option>+62</option>
              <option>+234</option>
              <option>+1</option>
            </select>
            <input
              type="text"
              name="phone"
              value={user.phone}
              placeholder="Phone Number"
              required
              onChange={handleChange}
            />
          </div>
          <textarea
            name="message"
            value={user.message}
            placeholder="How can we help?"
            required
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
          <p className="terms">
            By contacting us, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Contacts;
