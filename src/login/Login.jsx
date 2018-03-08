import React, { Component } from 'react';
import './login.css';
import Details from '../details/Details';

class Login extends Component {
  render() {
    return (
      <div className="login-main">
        <div className="loginBox" >
          <div className="login-title">
          Login
          </div>
          <div className="login-details">
            <Details icon="account_circle" placeholder="Enter E-mail ID" />
            <Details icon="vpn_key" placeholder="password" />
            <div className="forget-password">Forgot Password?</div>
            <div className="login-button-div">
              <button className="login-button">Login</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
