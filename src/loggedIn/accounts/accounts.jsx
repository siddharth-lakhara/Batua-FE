import React from 'react';
import './accounts.css';

const Accounts = () => (
  <div className="Accounts-main">
    <div className="Accounts-head">
      Accounts
    </div>
    <div className="Accounts-content">
      <div>
        <button className="Accounts-contentItem">
          All Accounts
        </button>
      </div>
      <div>
        <button className="Accounts-contentItem">
          HDFC
        </button>
      </div>
      <div>
        <button className="Accounts-contentItem">
          Axis Bank
        </button>
      </div>
    </div>
  </div>
);

export default Accounts;

