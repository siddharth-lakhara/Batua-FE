import React, { Component } from 'react';
import './register.css';
import Details from '../details/Details';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'sid',
      lastName: '',
      aadharNo: null,
      phone: '',
      accountNo: '',
      userName: '',
      password: '',
      confirmPassword: '',
    };
    this.registerUser = this.registerUser.bind(this);
  }

  registerUser() {
    const {
      firstName, lastName, phone, accountNo, userName, password,
    } = this.state;
    const aadharNo = Number(this.state.aadharNo);
    const POSTdata = {
      firstName, lastName, phone, accountNo, userName, password, aadharNo,
    };

    fetch('/user', {
      method: 'POST',
      body: JSON.stringify(POSTdata),
    })
      .then(data => data.json())
      .then((data) => { console.log(data); });
  }

  render() {
    return (
      <div className="register-main">
        <div className="registerBox" >
          <div className="register-title">
          Register
          </div>
          <div className="register-details">
            <Details icon="person" placeholder="FirstName" value={this.state.firstName} changeHandler={(event) => { this.setState({ firstName: event.target.value }, () => { console.log('newState: ', this.state.firstName); }); }} />
            <Details icon="perm_identity" placeholder="Last Name" value={this.state.lastName} changeHandler={(event) => { this.setState({ lastName: event.target.value }, () => { console.log('newState: ', this.state.lastName); }); }} />
            <Details icon="confirmation_number" placeholder="Aadhar number" value={this.state.aadharNo} changeHandler={(event) => { this.setState({ aadharNo: event.target.value }, () => { console.log('newState: ', this.state.aadharNo); }); }} />
            <Details icon="account_balance_wallet" placeholder="Account Number" value={this.state.accountNo} changeHandler={(event) => { this.setState({ accountNo: event.target.value }, () => { console.log('newState: ', this.state.accountNo); }); }} />
            <Details icon="phone_iphone" placeholder="Phone Number" value={this.state.phone} changeHandler={(event) => { this.setState({ phone: event.target.value }, () => { console.log('newState: ', this.state.phone); }); }} />
            <Details icon="assignment_ind" placeholder="User Name" value={this.state.userName} changeHandler={(event) => { this.setState({ userName: event.target.value }, () => { console.log('newState: ', this.state.userName); }); }} />
            <Details icon="vpn_key" placeholder="password" value={this.state.password} changeHandler={(event) => { this.setState({ password: event.target.value }, () => { console.log('newState: ', this.state.password); }); }} />
            <Details icon="vpn_key" placeholder="Confirm password" value={this.state.confirmPassword} changeHandler={(event) => { this.setState({ confirmPassword: event.target.value }, () => { console.log('newState: ', this.state.confirmPassword); }); }} />
            <div className="register-button-div">
              <button
                className="register-button"
                onClick={() => {
                  if (this.state.password !== this.state.confirmPassword) {
                    alert('Passwords don\'t match');
                  } else {
                    this.registerUser();
                    // this.props.changeToRegister();
                  }
                }
              }
              >
              Register
              </button>
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

export default Login;
