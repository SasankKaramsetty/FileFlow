import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { fname, lname, email, password } = formData;
    console.log(fname, lname, email, password);

    try {
      const response = await fetch('http://localhost:8000/api/files/signup', {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          fname,
          email,
          lname,
          password,
        }),
      });

      const data = await response.json();
      console.log(data, 'userRegister');

      if (data.status === 'ok') {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
        alert('Registration Successful');
      } else {
        alert('Email is already exist');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSignUp}>
        <h1 className="app-title">FileFlow</h1>

        <h3 className="signup-title">Sign Up</h3>

        <div className="mb-3">
          <label className="medium-label">First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            name="fname"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="medium-label">Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            name="lname"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="medium-label">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="medium-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            onChange={handleInputChange}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/login">sign in?</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
