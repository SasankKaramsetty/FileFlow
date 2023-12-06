import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({onLogin}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    try {
      const response = await fetch('http://localhost:8000/api/files/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data);
        navigate('/'); 
      } else {
        console.error('Login failed:', data.error);
        alert("User is Not there Create New Account")
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleLogin}>
        <h1 className="appTitle">FileFlow</h1>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            onChange={handleInputChange}
            value={formData.email}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            name="password"
            onChange={handleInputChange}
            value={formData.password}
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="customCheck1" />
            <label className="custom-control-label checkboxLabel" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid buttonContainer">
          <button type="submit" className="btn btn-primary button">
            Login
          </button>
        </div>
        <p className="forgot-password text-right">
          Not a user? Create one <a href="/signup">sign up?</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
