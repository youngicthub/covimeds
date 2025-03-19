import React from "react";
import "./Aboutus.css";

import Partners from "./Partners";
const AboutUs = () => {
  return (
    <div className='about-begin'>
      <h1 className='about-title'>About Us</h1>
      <h2 className='about-subtitle'>
        CoviMeds – Your Trusted Pharmaceutical Partner
      </h2>
      <div className='about-container'>
        <p className='about-text'>
          Established in <strong>2023</strong>, <strong>CoviMeds</strong> is
          dedicated to providing high-quality pharmaceutical products to ensure
          the well-being of our customers. With a strong commitment to safety,
          innovation, and customer satisfaction, we have built a reputation as a
          trusted name in the healthcare industry.
        </p>
      </div>

      <Partners />
    </div>
  );
};

export default AboutUs;
