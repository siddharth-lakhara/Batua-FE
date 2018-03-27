import React from 'react';
import './UserInfo.css';

const UserInfo = props => (
  <div className="UserInfo-main">
    <div className="UserInfo-box">
      <div className="UserInfo-social">
        <div className="UserInfo-user-image">
          <img
            src={`/images/${props.userName}.jpg`}
            className="UserInfo-social-img"
            alt="User profile"
          />
        </div>
        <div className="UserInfo-welcome-user">Welcome Back, {props.userName}</div>
      </div>
    </div>
    <div className="UserInfo-Actions">
      <div className="UserInfo-balance">
        <div className="UserInfo-totalBalance">Total Balance</div>
        <div className="UserInfo-currentBalance">Rs {props.balance}</div>
      </div>
      <div className="UserInfo-line" />
      <div className="UserInfo-txn">
        <button className="UserInfo-send-button" onClick={props.send}>
          Send
        </button>
        <button className="UserInfo-receive-button" onClick={props.request}>
          Request
        </button>
      </div>
    </div>
  </div>
);

export default UserInfo;
