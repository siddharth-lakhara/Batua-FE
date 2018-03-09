import React from 'react';
import './transactionsHeader.css';

const TransactionsHeader = () => (
  <div className="transactionsHeader-main">
    <div>
        Recent Transactions
    </div>

    <div>
      <button>All</button>
      <button>Sent</button>
      <button>Received</button>
    </div>
  </div>
);

export default TransactionsHeader;

