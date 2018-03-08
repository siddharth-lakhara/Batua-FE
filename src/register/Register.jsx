import React, { Component } from 'react';
import './register.css';
import Details from '../details/Details';

class Login extends Component {
  render() {
    return (
      <div className="register-main">
        <div className="registerBox" >
          <div className="register-title">
          Register
          </div>
          <div className="register-details">
            <Details icon="person" placeholder="First Name" />
            <Details icon="perm_identity" placeholder="Last Name" />
            <Details icon="confirmation_number" placeholder="Aadhar number" />
            <Details icon="account_balance_wallet" placeholder="Account Number" />
            <Details icon="phone_iphone" placeholder="Phone Number" />
            <Details icon="assignment_ind" placeholder="User Name" />
            <Details icon="vpn_key" placeholder="password" />
            <div className="register-button-div">
              <button className="register-button">register</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
