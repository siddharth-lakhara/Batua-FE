
import React, { Component } from 'react';
import './ForgotPassword.css';
import InputField from '../InputField';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      page: 'userName',
    };
  }
  onEnter = () => {
    alert('password changed successfully!');
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
                change={e => this.setState({ userName: e.target.value })}
              />
              <div className="ForgotPassword-button-div">
                <button
                  className="ForgotPassword-button"
                  onClick={() => this.setState({ page: 'password' })}
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
              change={e => this.setState({ userName: e.target.value })}
            />
            <InputField
              icon="vpn_key"
              placeholder="set password"
              change={e => this.setState({ userName: e.target.value })}
            />
            <InputField
              icon="vpn_key"
              placeholder="confirm password"
              change={e => this.setState({ userName: e.target.value })}
            />
            <div className="ForgotPassword-button-div">
              <button
                className="ForgotPassword-button"
                onClick={() => { this.onEnter(); this.props.onClick(this.state.userName, this.state.password); }}
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
