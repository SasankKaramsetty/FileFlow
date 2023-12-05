import React, { Component } from 'react';
import './Signup.css';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: '',
      // userType,
    };
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp(e) {
    e.preventDefault(); 

    const { fname, lname, email, password } = this.state;
    console.log(fname, lname, email, password);
    fetch('http://localhost:8000/api/files/signup', {
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
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'userRegister');
        if (data.status === 'ok') {
          alert('Registration Successful');
        } else {
          alert('Something went wrong');
        }
      });
  }

  render() {
    return (
      <div className="container">
        <form className="form" onSubmit={this.handleSignUp}>
          <h1 className="app-title">FileFlow</h1>

          <h3 className="signup-title">Sign Up</h3>

          <div className="mb-3">
            <label className="medium-label">First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={(e) => this.setState({ fname: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="medium-label">Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={(e) => this.setState({ lname: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="medium-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="medium-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => this.setState({ password: e.target.value })}
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
  }
}
