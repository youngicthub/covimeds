import React, { useEffect, useState } from "react";
import Productdetails from "./Productdetails";

import "./product.css";

import { FaCartArrowDown } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import { baseURL } from "./Admin/utils/url";
import axios from "axios";
import { onAddtoCartHandler } from "./Cart/Cart";
import { Link } from "react-router-dom";

const Product = ({ details, view, close, setClose, addtoCart }) => {
  // const filtterproduct = (product) => {
  //   const update = Productdetails.filter((x) => {
  //     return x.Cat === product;
  //   });
  //   setProduct(update);
  // };

  // const AllProducts = () => {
  //   setProduct(Productdetails);
  // };

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [viewProduct, setViewProduct] = useState({});
  const [showDescription, setShowDescription] = useState();

  useEffect(() => {
    const apiUrl = baseURL() + "/categories";
    axios
      .get(apiUrl)
      .then((response) => {
        if (Array.isArray(response.data)) setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // Find item by category

  const url = new URLSearchParams(window.location.search);
  let categoryId = url.get("categoryId");

  console.log("xxe", categoryId);
  useEffect(() => {
    console.log("Hey");
    const apiUrl = baseURL() + "/product_by_category/" + categoryId;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("====>>>", response.data);

        if (Array.isArray(response.data)) setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [window.location.search]);

  return (
    <>
      {showDescription ? (
        <div className="product_details">
          <div className="container">
            <button
              onClick={() => setShowDescription(false)}
              className="closebtn"
            >
              {" "}
              <IoCloseSharp />
            </button>

            <div className="productbox">
              <div className="img-box">
                <img
                  src={baseURL() + "/webStorage/product/" + viewProduct.image}
                  alt={viewProduct.name}
                />
              </div>
              <div className="details">
                <h4> {viewProduct.category}</h4>
                <h3> {viewProduct.name}</h3>
                <p> {viewProduct.description}</p>
                <h3> ${viewProduct.price}</h3>
                <button
                  className=""
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

      <div className="product">
        <h2> Products </h2>
        <p> Home . products</p>

        <div className="ProductContainer">
          <div className="filter">
            <div className="categories">
              <h2> Categories</h2>
              <ul>
                <li>
                  <a href={"/product?categoryId=all"}>All products</a>
                </li>
                {categories.map((item) => {
                  return (
                    <li>
                      <a href={"/product?categoryId=" + item._id}>
                        {item.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="product-box">
            <div className="contant1">
              {products.map((curElm) => {
                return (
                  <div className="box1" key={curElm.id}>
                    <div className="imgBox1">
                      <img
                        src={baseURL() + "/webStorage/product/" + curElm.image}
                        alt={curElm.name}
                      />
                    </div>
                    <div className="productIcons">
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
                    <div className="productdetails">
                      <p> {curElm.category} </p>
                      <h3> {curElm.name} </h3>
                      <h4> ${curElm.price} </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
