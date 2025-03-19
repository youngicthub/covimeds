import React from 'react';
import "../UserDashboard/accountdetails.css";

const AccountDetails = ({ user }) => {
  return (
    <div className="account-details">
      <h2>Account Details</h2>

      <form className="profile-form">
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" defaultValue={user?.firstName} required />

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" defaultValue={user?.lastName} required />

        <label htmlFor="email">Email Address:</label>
        <input type="email" id="email" name="email" defaultValue={user?.email} required disabled />

        <button type="submit">Save Changes</button>
      </form>

      <form className="password-form">
        <h2>Change Password</h2>

        <label htmlFor="currentPassword">Current Password:</label>
        <input type="password" id="currentPassword" name="currentPassword" required />

        <label htmlFor="newPassword">New Password:</label>
        <input type="password" id="newPassword" name="newPassword" required />

        <label htmlFor="confirmPassword">Confirm New Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" required />

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default AccountDetails;
