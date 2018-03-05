import React from 'react';
import './transactions.css';

const Transactions = () => (
  <div className="Transactions-main">
    <div className="Transactions-head">
      Transactions
    </div>
    <div className="Transactions-content">
      <div>
        <button className="Transactions-contentItem">
        All Transactions
        </button>
      </div>
      <div>
        <button className="Transactions-contentItem">
        Send
        </button>
      </div>
      <div>
        <button className="Transactions-contentItem">
        Recieve
        </button>
      </div>
    </div>
  </div>
);

export default Transactions;

