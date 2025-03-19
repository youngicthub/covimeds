import React, { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
// import { FaArrowRight } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";

import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

import { FaTruckMoving } from "react-icons/fa6";
import { FaCommentDollar } from "react-icons/fa";
import { FaPercent } from "react-icons/fa";
import { FaHeadphones } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

import HomeProduct from "./HomeProduct";
import { baseURL } from "./Admin/utils/url";
import axios from "axios";
import { onAddtoCartHandler } from "./Cart/Cart";

import LiveChat from "./LiveChat";

const Home = ({ details, view, close, setClose, addtoCart }) => {
  const [products, seProducts] = useState([]);
  const [viewProduct, setViewProduct] = useState({});
  const [showDescription, setShowDescription] = useState();

  useEffect(() => {
    const apiUrl = baseURL() + "/products";
    axios
      .get(apiUrl)
      .then((response) => {
        if (Array.isArray(response.data)) seProducts(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  console.log(viewProduct);

  return (
    <div>
      <div className='homeBG'>
        <h1> CoviMeds is the Best in Town </h1>
        <div className='homebg'>
          <img
            src='https://images.pexels.com/photos/3082452/pexels-photo-3082452.jpeg?auto=compress&cs=tinysrgb&w=800'
            alt='BG IMG'
          />
        </div>

        <Link to='/product' className='shopNow'>
          {" "}
          Shop Now
        </Link>
      </div>

      {showDescription ? (
        <div className='product_details'>
          <div className='container'>
            <button
              onClick={() => setShowDescription(false)}
              className='closebtn'
            >
              {" "}
              <IoCloseSharp />
            </button>

            <div className='productbox'>
              <div className='img-box'>
                <img
                  src={baseURL() + "/webStorage/product/" + viewProduct.image}
                  alt={viewProduct.name}
                />
              </div>
              <div className='details'>
                <h4> {viewProduct.category}</h4>
                <h3> {viewProduct.name}</h3>
                <p> {viewProduct.description}</p>
                <h3> ${viewProduct.price}</h3>
                <button
                  className=''
                  onClick={() => onAddtoCartHandler(viewProduct)}
                >
                  {" "}
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className='ourproducts'>
        <h1>Our Products Sample</h1>
      </div>

      <div className='products'>
        <div className='container'>
          <div className='imgbox'>
            <img src='./Fenbenz-500-300x300.png' alt='Fenbenz' />
            <div className='iconsDetails'>
              <Link to='/cart' className='cartItem'>
                {" "}
                <FaCartArrowDown />{" "}
              </Link>
            </div>
            <div className='div'>
              <Link to='/product' className='link'>
                {" "}
                <h3> Fenbenz</h3>{" "}
              </Link>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='imgbox'>
            <img src='./colchiheal-0.5.jpg' alt='colchiheal' />
            <div className='iconsDetails'>
              <Link to='/cart' className='cartItem'>
                {" "}
                <FaCartArrowDown />{" "}
              </Link>
            </div>

            <div className='div'>
              <Link to='/product' className='link'>
                <h3> Colchiheal</h3>{" "}
              </Link>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='imgbox'>
            <img src='./vitamin2.png' alt='Paracetamol' />
            <div className='iconsDetails'>
              <Link to='/cart' className='cartItem'>
                {" "}
                <FaCartArrowDown />{" "}
              </Link>
            </div>
            <div className='div'>
              <Link to='/product' className='link'>
                <h3> Paracetamol</h3>{" "}
              </Link>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='imgbox'>
            <img src='./doxycycline.jpg' alt='doxycycline' />
            <div className='iconsDetails'>
              <Link to='/cart' className='cartItem'>
                {" "}
                <FaCartArrowDown />{" "}
              </Link>
            </div>
            <div className='div'>
              <Link to='/product' className='link'>
                <h3> Doxycycline </h3>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='aboutus'>
        <div className='container'>
          <div className='box'>
            <div className='icon'>
              <FaTruckMoving />
            </div>
            <div className='details'>
              <h3> Free Shipping </h3>
              <p> Order above $1000</p>
            </div>
          </div>

          <div className='box'>
            <div className='icon'>
              <FaCommentDollar />
            </div>
            <div className='details'>
              <h3> Return & Return </h3>
              <p> Money Back Guarantee</p>
            </div>
          </div>

          <div className='box'>
            <div className='icon'>
              <FaPercent />
            </div>
            <div className='details'>
              <h3> Member Discount </h3>
              <p> One Every order</p>
            </div>
          </div>

          <div className='box'>
            <div className='icon'>
              <FaHeadphones />
            </div>
            <div className='details'>
              <h3> Customer Support </h3>
              <p> 24/7 Chat support services</p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className='partners'>
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
      </div> */}

      <br />

      <div className='product'>
        <h2> Top Products </h2>

        {products.length < 1 && <h1>Loading...</h1>}
        <div className='productcontainer'>
          {products.map((curElm) => {
            return (
              <div className='productbox' key={curElm.id}>
                <div className='imgBox'>
                  <img
                    src={baseURL() + "/webStorage/product/" + curElm.image}
                    alt={curElm.name}
                  />
                </div>
                <div className='productIcons'>
                  <li onClick={() => onAddtoCartHandler(curElm)}>
                    <FaCartArrowDown />
                  </li>
                  <li
                    onClick={() => {
                      setShowDescription(true);
                      setViewProduct(curElm);
                    }}
                  >
                    {" "}
                    <IoEyeOutline />
                  </li>
                  {/* <li>
                    {" "}
                    <CiHeart />{" "}
                  </li> */}
                </div>
                <div className='productdetails'>
                  <p> {curElm.category} </p>
                  <h3> {curElm.name} </h3>
                  <h4> ${curElm.price} </h4>
                </div>
              </div>
              
            );
          })}
      <br />
      <br />

        </div>
      </div>
      <br />
      <LiveChat />
  
  
      </div> 
  );
};

export default Home;
