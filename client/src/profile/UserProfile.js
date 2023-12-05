import React from 'react';
import "./profile.css"
const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-content">
          <h1>User Profile Page</h1>
          <p>First Name: {user.fname}</p>
          <p>Last Name: {user.lname}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default UserProfile;
