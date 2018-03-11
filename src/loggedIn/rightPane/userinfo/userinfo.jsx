import React from 'react';
import './userinfo.css';

const UserInfo = () => (
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
        <div className="UserInfo-currentBalance">Rs 3000</div>
      </div>
      <div className="UserInfo-line" />
      <div className="UserInfo-txn">
        <button className="UserInfo-send-button">
          Send
        </button>
        <button className="UserInfo-receive-button">
          Receive
        </button>
      </div>
    </div>
  </div>
);

export default UserInfo;

