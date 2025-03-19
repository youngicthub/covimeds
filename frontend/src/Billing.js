import React, { useState, useEffect } from "react";
import "./billingForm.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseURL } from "./Admin/utils/url";
import { clientAccessToken } from "./Admin/utils/AccessToken";

const BillingDetailsForm = (props) => {
  // Ensure that cart is defined in props.orderData
  const [cart, setCart] = useState([]);
  const [hasSubmiitedBillingAddress, setHasSubmiitedBillingAddress] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitting2, setIsSubmitting2] = useState(false);

  const countries = [
    "USA",
    "Canada",
    "UK",
    "Australia",
    "India",
    "Germany",
    "France",
    "Brazil",
    "Japan",
    "China",
    "South Africa",
    "Mexico",
    "Italy",
    "Spain",
    "Argentina",
    "Netherlands",
    "New Zealand",
    "Singapore",
    "Russia",
    "Sweden",
    "Nigeria",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    stateProvince: "",
    postalCode: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const postData = {
      fullName: formData.name,
      email: formData.email,
      phoneNumber: formData.phone,
      country: formData.country,
      state: formData.stateProvince,
      postalCode: formData.postalCode,
    };

    axios
      .post(baseURL() + "/billing_address", postData, {
        headers: {
          Authorization: "Bearer " + clientAccessToken(),
        },
      })
      .then((response) => {
        // Handle the success response
        console.log("Response:", response.data);
        setIsSubmitting(false);
        setHasSubmiitedBillingAddress(true);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    let carts_ = localStorage.getItem("cart");
    if (carts_ !== null) setCart(JSON.parse(carts_));

    let id = setInterval(() => {
      let carts_ = localStorage.getItem("cart");
      if (carts_ !== null) setCart(JSON.parse(carts_));
    }, 2000);
    return () => clearTimeout(id);
  }, []);

  let grandCart = cart.map((cur) => {
    cur.Price = parseInt(cur.Price);
    cur.subTotal = cur.price * cur.qty;
    return cur.subTotal;
  });

  let grandTotal = grandCart.reduce((a, b) => {
    return a + b;
  }, 0);

  const onPlaceOrderHandler = () => {
    setIsSubmitting2(true);

    let storedCarts = localStorage.getItem("cart");
    if (storedCarts === null) return alert("Your cart is empty");
    let carts = JSON.parse(storedCarts);

    axios
      .post(
        baseURL() + "/place-order-email",
        {
          email: formData.email,
        },
        {
          headers: {
            Authorization: "Bearer " + clientAccessToken(),
          },
        }
      )
      .then((response) => {
        // Handle the success response
        console.log("Response:", response.data);
        setIsSubmitting2(false);
        window.location.href = "/payment";
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
        setIsSubmitting2(false);
      });
  };

  // const onPlaceOrderHandler  = () => {

  // }

  return (
    <div className='billing-form-container'>
      <div className='billing-form'>
        <h2>Billing Details</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Name:</label>
            <input
              type='text'
              name='name'
              value={formData?.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label>Email:</label>
            <input
              type='email'
              name='email'
              value={formData?.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label>Phone No:</label>
            <input
              type='phone'
              name='phone'
              value={formData?.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label>Country:</label>
            <select
              name='country'
              value={formData?.country}
              onChange={handleChange}
              required
            >
              <option value='' disabled>
                Select Country
              </option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className='form-group'>
            <label>Address</label>
            <input
              type='text'
              name='postalCode'
              value={formData?.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label>State/Province:</label>
            <input
              type='text'
              name='stateProvince'
              value={formData?.stateProvince}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label>Postal Code:</label>
            <input
              type='text'
              name='postalCode'
              value={formData?.postalCode}
              onChange={handleChange}
              required
            />
          </div>
          {hasSubmiitedBillingAddress ? (
            <div>
              <p style={{ color: "green", fontWeight: "bold" }}>
                Billing address saved
              </p>
            </div>
          ) : (
            <>
              {isSubmitting ? (
                <button type='submit' className='submit' disabled>
                  Please wait...
                </button>
              ) : (
                <button type='submit' className='submit'>
                  Submit
                </button>
              )}
            </>
          )}
        </form>
      </div>
      <div className='order-details'>
        <h2>Order Details</h2>

        {/* <p>Total amount: </p> */}
        <p> Quantity: {cart.length}</p>
        <p>Shipping Fee: {grandTotal < 1000 ? "$90" : "Free"}</p>
        <p>Total Price: ${grandTotal.toLocaleString("en")}</p>
        <p>Grand Total: ${(grandTotal + 90).toLocaleString("en")}</p>

        {/* Payment Method Section */}
        {/* <div className="payment-method">
          <h2>Payment Method</h2>
          <p>Wallet Address: your_wallet_address_here</p>
          <button onClick={copyWalletAddress}>Copy Wallet Address</button>
        </div> */}
        <hr />
        <br />
        <div>
          {hasSubmiitedBillingAddress ? (
            // <Link to="/payment" className="placeOrder">
            //   Place Order
            // </Link>

            <>
              {!isSubmitting2 ? (
                <button onClick={onPlaceOrderHandler} className='placeOrder'>
                  Place Order
                </button>
              ) : (
                <button className='placeOrder'>Please wait....</button>
              )}
            </>
          ) : (
            <>
              <p style={{ color: "red", fontWeight: "bold" }}>
                Billing address is required
              </p>
              <p style={{ color: "red" }}>
                The button below will become active once you have provided your
                billing address.
              </p>

              <button
                disabled
                className='placeOrder'
                style={{
                  backgroundColor: "gray",
                }}
              >
                {" "}
                Place order
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingDetailsForm;
