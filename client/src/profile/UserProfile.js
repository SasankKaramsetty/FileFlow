import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./profile.css"

const UserProfile = ({ updateUser }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    updateUser(null);
    navigate('/signup');
  };
  
  const handleDeleteAccount = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/files/delete-account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          fname: user.fname,
          lname: user.lname,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.removeItem('user');
        updateUser(null);
        navigate('/signup');
      } else {
        console.error('Account deletion failed:', data.error);
      }
    } catch (error) {
      console.error('Error during account deletion:', error);
    }
  };
  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-content">
          <h1>User Profile Page</h1>
          <p>First Name: {user.fname}</p>
          <p>Last Name: {user.lname}</p>
          <p>Email: {user.email}</p>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
          <button className='delete-account' onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default UserProfile;
