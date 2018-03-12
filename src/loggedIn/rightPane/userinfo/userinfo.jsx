import React from 'react';
import './userinfo.css';

const UserInfo = props => (
  <div className="UserInfo-main">
    <div className="UserInfo-box">
      <div className="UserInfo-social">
        <img
          src="social.jpg"
          className="UserInfo-social-img"
        />
      </div>
    </div>
    <div className="UserInfo-Actions">
      <div className="UserInfo-balance">
        <div className="UserInfo-totalBalance">Total Balance</div>
        <div className="UserInfo-currentBalance">Rs {props.balance}</div>
      </div>
      <div className="UserInfo-line" />
      <div className="UserInfo-txn">
        <button className="UserInfo-send-button">
          Send
        </button>
        <button className="UserInfo-receive-button">
          Request
        </button>
      </div>
    </div>
  </div>
);

export default UserInfo;

