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

  loginUser() {
    const { userName, password } = this.state;
    const postData = {
      userName, password,
    };
    // console.log(postData);
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
          this.props.changePage(token, userName);
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
            <Details
              icon="account_circle"
              placeholder="Enter user name"
              value={this.state.userName}
              changeHandler={(event) => { this.setState({ userName: event.target.value }); }}
            />
            <Details
              icon="vpn_key"
              placeholder="password"
              value={this.state.password}
              changeHandler={(event) => { this.setState({ password: event.target.value }); }}
            />
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
