import React, { Component } from 'react';
import './register.css';
import Details from '../details/Details';

class Register extends Component {
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
            <Details icon="vpn_key" placeholder="Confirm password" />
            <div className="register-button-div">
              <button className="register-button">Register</button>
            </div>
          </div>
        </div>
        <div className="olduser-div" >
          <div className="old-user">Already a User?</div>
          <button href="" onClick={this.props.changeToRegister} className="login-now"><u>Login Now</u></button>
        </div>
      </div>
    );
  }
}

export default Register;
