import React, { Component } from 'react';
import './Register.css';
import InputField from '../InputField';

const validInput = (dataToValidate) => {
  const values = Object.values(dataToValidate);
  for (let i = 0; i < values.length; i += 1) {
    if (values[i] === '') { return false; }
  }

  return true;
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      aadharNo: '',
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

    if (!validInput(POSTdata)) {
      alert('Please fill all the required fields');
      return;
    }

    fetch('/users', {
      method: 'POST',
      body: JSON.stringify(POSTdata),
    })
      .then(data => data.json())
      .then((data) => {
        console.log('data', data);

        if (data.statusCode === 400) {
          alert('UserName already taken');
        } else {
          alert('UserName successfully created');
          this.props.onClick();
        }
      });
  }

  render() {
    return (
      <div className="register-main">
        <div className="registerBox" >
          <div className="register-title">
          Register
          </div>
          <div className="register-details">
            <InputField icon="person" placeholder="FirstName" value={this.state.firstName} change={(event) => { this.setState({ firstName: event.target.value }, () => { console.log('newState: ', this.state.firstName); }); }} />
            <InputField icon="perm_identity" placeholder="Last Name" value={this.state.lastName} change={(event) => { this.setState({ lastName: event.target.value }, () => { console.log('newState: ', this.state.lastName); }); }} />
            <InputField icon="confirmation_number" placeholder="Aadhar number" value={this.state.aadharNo} change={(event) => { console.log('type: ', typeof (event.target.value)); this.setState({ aadharNo: event.target.value }, () => { console.log('newState: ', this.state.aadharNo); }); }} />
            <InputField icon="account_balance_wallet" placeholder="Account Number" value={this.state.accountNo} change={(event) => { this.setState({ accountNo: event.target.value }, () => { console.log('newState: ', this.state.accountNo); }); }} />
            <InputField icon="phone_iphone" placeholder="Phone Number" value={this.state.phone} change={(event) => { this.setState({ phone: event.target.value }, () => { console.log('newState: ', this.state.phone); }); }} />
            <InputField icon="assignment_ind" placeholder="User Name" value={this.state.userName} change={(event) => { this.setState({ userName: event.target.value }, () => { console.log('newState: ', this.state.userName); }); }} />
            <InputField icon="vpn_key" type="password" placeholder="password" value={this.state.password} change={(event) => { this.setState({ password: event.target.value }, () => { console.log('newState: ', this.state.password); }); }} />
            <InputField icon="vpn_key" type="password" placeholder="Confirm password" value={this.state.confirmPassword} change={(event) => { this.setState({ confirmPassword: event.target.value }, () => { console.log('newState: ', this.state.confirmPassword); }); }} />
            <div className="register-button-div">
              <button
                className="register-button"
                onClick={() => {
                  if (this.state.password !== this.state.confirmPassword) {
                    alert('Passwords don\'t match');
                  } else { this.registerUser(); }
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
          <button href="" onClick={this.props.onClick} className="login-now"><u>Login Now</u></button>
        </div>
      </div>
    );
  }
}

export default Register;
