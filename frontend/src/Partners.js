import React from "react";
import "./home.css";

function Partners() {
  return (
    <>
      <div className='partners'>
        <h2 className='partnersText'> Our Partners </h2>
        <div className='partnersContainer'>
          <div className='partnersCon'>
            <img src='./wisdom.jpeg' alt='partner1' />
            <div className='partnerDetails'>
              <h5 className='partnerName'> Dr. Wisdom </h5>
              <p> Surgeon</p>
            </div>
          </div>

          <div className='partnersCon'>
            <img src='./williams.jpeg' alt='partner1' />
            <div className='partnerDetails'>
              <h5 className='partnerName'>Dr. William Makis MD</h5>
              <p> Oncologist </p>
            </div>
          </div>
          <div className='partnersCon'>
            <img src='./bryan.jpeg' alt='partner1' />
            <div className='partnerDetails'>
              <h5 className='partnerName'> Dr. Bryan Adis D.C</h5>
              <p> Physician </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Partners;
