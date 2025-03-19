import React from "react";
import "./RefundPolicy.css"; // Import external CSS

const RefundPolicy = () => {
  return (
    <div className='refund-container'>
      {/* Header Section */}
      <h1 className='refund-title'>Refund Policy</h1>
      <h2 className='refund-subtitle'>CoviMeds</h2>
      {/* <p className="refund-date"><strong>Effective Date:</strong> [Effective Date]</p> */}

      {/* Introduction */}
      <p className='refund-text'>
        At <strong>CoviMeds</strong>, we prioritize the safety and satisfaction
        of our customers. Due to the nature of pharmaceutical products, we have
        established this refund policy to ensure compliance with industry
        regulations and to maintain the highest quality standards.
      </p>

      {/* Eligibility for Refunds */}
      <section className='refund-section'>
        <h3>1. Eligibility for Refunds</h3>
        <ul>
          <li>The product was damaged or defective upon delivery.</li>
          <li>The wrong product was delivered due to an error on our part.</li>
          <li>
            The product is recalled due to safety concerns or regulatory
            requirements.
          </li>
          <li>
            The product was not delivered within the expected timeframe due to
            reasons beyond the customer's control.
          </li>
        </ul>
      </section>

      {/* Non-Refundable Items */}
      <section className='refund-section'>
        <h3>2. Non-Refundable Items</h3>
        <p>
          To ensure safety and compliance with pharmaceutical regulations, we{" "}
          <strong>do not</strong> accept returns or provide refunds for the
          following:
        </p>
        <ul>
          <li>Opened or used medications.</li>
          <li>
            Prescription drugs (unless defective, damaged, or incorrectly
            delivered).
          </li>
          <li>Products that have been tampered with or improperly stored.</li>
          <li>Items purchased from unauthorized sellers.</li>
          <li>Products returned after the specified refund request period.</li>
        </ul>
      </section>

      {/* Refund Request Process */}
      <section className='refund-section'>
        <h3>3. Refund Request Process</h3>
        <p>To request a refund, customers must follow these steps:</p>
        <ol>
          <li>
            <strong>Contact Us</strong> within <strong>5days</strong> of
            receiving the product via
            <a href='mailto:info@covimeds.org' className='refund-link'>
              {" "}
              info@covimeds.org
            </a>
            .
          </li>
          <li>
            Provide the following information:
            <ul>
              <li>Order number and proof of purchase.</li>
              <li>Description and photo evidence of the issue.</li>
            </ul>
          </li>
          <li>
            Await confirmation from our customer service team regarding the
            approval or rejection of the refund request.
          </li>
        </ol>
      </section>

      {/* Refund Approval & Processing */}
      <section className='refund-section'>
        <h3>4. Refund Approval & Processing</h3>
        <ul>
          <li>
            Approved refunds will be processed within{" "}
            <strong>5business days</strong>.
          </li>
          <li>
            Refunds will be issued via the original payment method unless
            otherwise agreed upon.
          </li>
          <li>
            Customers may be required to return defective or incorrect products
            before a refund is processed. Return shipping costs may be covered
            by <strong>CoviMeds</strong> if the error was on our part.
          </li>
        </ul>
      </section>

      {/* Exchange Policy */}
      <section className='refund-section'>
        <h3>5. Exchange Policy</h3>
        <p>
          In cases where an eligible refund is requested, customers may opt for
          a product exchange instead of a refund, subject to availability.
        </p>
      </section>

      {/* Contact Information */}
      <section className='refund-section'>
        <h3>6. Contact Information</h3>
        <p>
          For refund-related inquiries, please contact our customer service team
          at:
        </p>
        <ul>
          <li>
            <strong>Email:</strong>{" "}
            <a href='mailto:info@covimeds.org' className='refund-link'>
              info@covimeds.org
            </a>
          </li>
          <li>
            <strong>Address:</strong> [Company Address]
          </li>
        </ul>
      </section>

      {/* Disclaimer */}
      <p className='refund-disclaimer'>
        <strong>CoviMeds</strong> reserves the right to modify this refund
        policy at any time to align with industry regulations and company
        policies. Customers are encouraged to review this policy periodically
        for updates.
      </p>
    </div>
  );
};

export default RefundPolicy;
