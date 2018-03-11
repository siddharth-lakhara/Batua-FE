import React, { Component } from 'react';
import './login.css';
import Details from '../details/Details';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'John_Doe',
      password: 'password',
    };
    this.loginUser = this.loginUser.bind(this);
  }

  // changeHandler() {

  // }

  loginUser() {
    const { userName, password } = this.state;
    const postData = {
      userName, password,
    };
    console.log(postData);
    fetch('/users/login', {
      method: 'POST',
      body: JSON.stringify(postData),
    })
      .then((data) => {
        if (data.status === 200) { return data.json(); }
        return 0;
      })
      .then((data) => {
        if (data) {
          const token = data.data.id_token;
          this.props.changePage(token);
        } else {
          alert('Invalid username or password');
        }
      });
    // this.props.changePage('123');
  }

  render() {
    return (
      <div className="login-main">
        <div className="loginBox" >
          <div className="login-title">
          Login
          </div>
          <div className="login-details">
            <Details icon="account_circle" placeholder="Enter E-mail ID" value={this.state.userName} />
            <Details icon="vpn_key" placeholder="password" value={this.state.password} />
            <div className="forget-password">Forgot Password?</div>
            <div className="login-button-div">
              <button className="login-button" onClick={this.loginUser}>Login</button>
            </div>
          </div>
        </div>
        <div className="newuser-div" >
          <div className="new-user">New User</div>
          <button href="" onClick={this.props.changeToRegister} className="register-now"><u>Register Now</u></button>
        </div>
      </div>
    );
  }
}

export default Login;
