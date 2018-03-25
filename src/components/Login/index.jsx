import React, { Component } from 'react';
import './Login.css';
import InputField from '../InputField';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    };
  }

  render() {
    return (
      <div className="login-main">
        <div className="loginBox" >
          <div className="login-title">
            Login
          </div>
          <div className="login-InputField">
            <InputField
              icon="account_circle"
              placeholder="Enter Username"
              change={e => this.setState({ userName: e.target.value })}
            />
            <InputField
              icon="vpn_key"
              placeholder="password"
              type="password"
              change={e => this.setState({ password: e.target.value })}
            />
            <button className="forget-password" onClick={() => { this.props.onForgotPassword(); }}>Forgot Password?</button>
            <div className="login-button-div">
              <button
                className="login-button"
                onClick={() => this.props.onClick(this.state.userName, this.state.password)}
              >Login
              </button>
            </div>
          </div>
        </div>
        <div className="newuser-div" >
          <div className="new-user">New User</div>
          <button href="" className="register-now"><u>Register Now</u></button>
        </div>
      </div>
    );
  }
}

export default Login;
