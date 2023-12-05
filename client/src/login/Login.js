import React, { Component } from 'react';
import './Login.css'; 

export default class Login extends Component {
  render() {
    return (
      <div className="container">
        <form className="form">
          <h1 className="appTitle">FileFlow</h1>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>

          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
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
          <p className="forgot-password text-right forgotPassword">
            Forgot <a href="#" className="forgotPasswordLink">password?</a>
          </p>
        </form>
      </div>
    );
  }
}
