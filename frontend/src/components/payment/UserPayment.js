import React, { useState } from "react";
import { Modal, Button, Toast } from "react-bootstrap";
import Select from "react-select";
import "../payment/userpayment.css";
import { FaCopy } from "react-icons/fa";
import { baseURL } from "../../Admin/utils/url";
import axios from "axios";
import { clientAccessToken } from "../../Admin/utils/AccessToken";
import Swal from "sweetalert2";

const UserPayment = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [copied, setCopied] = useState(false);
  const [file, setFile] = useState(null);
  const [payNowClicked, setPayNowClicked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const paymentOptions = [
    { value: "bitcoin", label: "Bitcoin (17GRePcZVHV9GRcT3GXzbKgpXwFjdm9ek7)" },
    { value: "paypal", label: "ZELE (ifeanyichukwusampraise@gmail.com)" },
    // { value: "usdt", label: "USDT (def456...)" },
  ];

  const copyAddress = () => {
    if (selectedPayment) {
      navigator.clipboard.writeText(
        selectedPayment.label.split("(")[1].split(")")[0]
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const openPopup = () => {
    setShowPopup(true);
    setPayNowClicked(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPayNowClicked(false);
  };

  const handlePayment = () => {
    if (!selectedPayment) {
      alert("Please select a payment method before submitting.");
      return;
    }

    let storedCarts = localStorage.getItem("cart");
    if (file === null) return alert("Please upload a payment receipt!");
    if (storedCarts === null) return alert("Your cart is empty");

    let carts = JSON.parse(storedCarts);

    setIsSubmitting(true);

    let formData = new FormData();
    formData.append("order", JSON.stringify(carts));
    formData.append("upload", file);

    axios
      .post(baseURL() + "/orders", formData, {
        headers: {
          Authorization: "Bearer " + clientAccessToken(),
        },
      })
      .then((response) => {
        // Handle the success response
        setIsSubmitting(false);

        Swal.fire({
          title: "Good",
          text: "Order created successfully!",
          icon: "success",
        });

        setTimeout(() => {
          window.location.href = "/myaccount?type=order";
        }, 2000);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
        setIsSubmitting(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });

        window.localStorage.removeItem("cart");
      });
  };

  return (
    <div className='paymentdetails'>
      <div onHide={closePopup} id='payment'>
        <Modal.Header closeButton>
          <Modal.Title className='btn' style={{ fontSize: 14 }}>
            Choose Payment Method
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalBody'>
          <p style={{ fontSize: 12 }}>
            {" "}
            <a
              href='/'
              style={{
                fontSize: 11,
                color: "red",
                textDecoration: "none",
                listStyle: "none",
              }}
            >
              {" "}
              Please Text Support After Successful Submission
            </a>{" "}
            <br />
            Please select your preferred payment method:
          </p>
          <Select
            options={paymentOptions}
            onChange={(selectedOption) => setSelectedPayment(selectedOption)}
          />
          {selectedPayment && (
            <div className='address'>
              <p style={{ fontSize: 12 }}> {selectedPayment.label}:</p>
              <span>{selectedPayment.label.split("(")[1].split(")")[0]}</span>
              <div className='copy'>
                <FaCopy onClick={copyAddress} />

                <Toast
                  show={copied}
                  onClose={() => setCopied(false)}
                  delay={2000}
                  autohide
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    fontSize: 12,
                    padding: "10px",
                    backgroundColor: "#7d0661",
                    color: "#fff",
                  }}
                >
                  <Toast.Body>Copied!</Toast.Body>
                </Toast>
              </div>
            </div>
          )}
          <div>
            <p>Upload Payment Receipt:</p>
            <input
              type='file'
              accept='.jpg, .png, .pdf'
              onChange={handleFileChange}
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {!isSubmitting ? (
            <Button
              variant='primary'
              onClick={handlePayment}
              className='submitBTN'
            >
              Submit Payment
            </Button>
          ) : (
            <Button variant='primary' className='submitBTN'>
              Please wait
            </Button>
          )}
        </Modal.Footer>
      </div>
    </div>
  );
};

export default UserPayment;
