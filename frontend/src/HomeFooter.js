// Footer.js

import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { CiFacebook } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-logo'>
          {/* Include your logo or any other content for the logo */}
          {/* <img src='covimeds.png' alt='Footer' /> */}
        </div>
        <div className='footer-links'>
          {/* Add your footer links here */}
          <Link to='/'> Home </Link>
          <Link to='/product'> Products </Link>
          <Link to='/contact'> Contact </Link>
          <Link to='/refund'> Refund Policy </Link>
          <Link to='/aboutus'> About us </Link>
        </div>
      </div>

      <div className='footer-bottom'>
        {/* Add additional content for the bottom of the footer */}
        <p>&copy; 2023 || CoviMeds </p>
      </div>
    </footer>
  );
};

export default Footer;
