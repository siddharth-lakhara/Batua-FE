import axios from 'axios';
import React, { Component } from 'react';
import './ForgotPassword.css';

import InputField from '../InputField';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      otp: '',
      setPassword: '',
      confirmPassword: '',
      page: 'userName',
    };
  }

  verifyOTP = () => {
    if (this.state.setPassword !== this.state.confirmPassword) {
      alert('Password does not match with the confirm password!');
    } else if (this.state.setPassword.length === 0) {
      alert('Empty passwords not accepted');
    } else {
      axios.patch('/forgetPassword/verifyOTP', { userName: this.state.userName, otp: this.state.otp, newPassword: this.state.setPassword })
        .then((result) => {
          alert(result.data);
          if (result.data === 'Password successfully reset') { this.props.onClick(); }
        });
    }
  }

  sendOTP = () => {
    axios.post('/forgetPassword', { userName: this.state.userName })
      .then((result) => {
        alert(result.data);
      });
  }

  render() {
    if (this.state.page === 'userName') {
      return (
        <div className="ForgotPassword-main">
          <div className="ForgotPassword-box" >
            <div className="ForgotPassword-title">
              Enter User Name
            </div>
            <div className="ForgotPassword-InputField">
              <InputField
                icon="account_circle"
                placeholder="userName"
                value={this.state.userName}
                change={e => this.setState({ userName: e.target.value })}
              />
              <div className="ForgotPassword-button-div">
                <button
                  className="ForgotPassword-button"
                  onClick={() => { this.sendOTP(this.props.authToken); this.setState({ page: 'password' }); }}
                >Enter
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="ForgotPassword-main">
        <div className="ForgotPassword-box" >
          <div className="ForgotPassword-title">
              One Time Password
          </div>
          <div className="ForgotPassword-InputField">
            <InputField
              icon="message"
              placeholder="enter OTP"
              value={this.state.otp}
              change={e => this.setState({ otp: e.target.value })}
            />
            <InputField
              icon="vpn_key"
              placeholder="set password"
              change={e => this.setState({ setPassword: e.target.value })}
            />
            <InputField
              icon="vpn_key"
              placeholder="confirm password"
              change={e => this.setState({ confirmPassword: e.target.value })}
            />
            <div className="ForgotPassword-button-div">
              <button
                className="ForgotPassword-button"
                onClick={() => { this.verifyOTP(); }}
              >Set
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ForgotPassword;
