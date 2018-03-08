import React from 'react';
import './userinfo.css';

const UserInfo = () => (
  <div className="UserInfo-main">
    <div className="UserInfo-box">
      UserInfo box
    </div>
    <div className="UserInfo-Actions">
      <div className="UserInfo-balance">
        <div>Total Balance</div>
        <div>Rs "Current Balance"</div>
      </div>
      <div className="UserInfo-txn">
        <button>
          Send
        </button>
        <button>
          Receive
        </button>
      </div>
    </div>
  </div>
);

export default UserInfo;

