import React from 'react';
import './transactionsHeader.css';

const TransactionsHeader = props => (
  <div className="transactionsHeader-main">
    <div>
        Recent Transactions
    </div>

    <div>
      <button
        className="transactionsHeader-button"
        style={{ color: props.displayTab === 0 ? '#05e0fa' : 'black' }}
        onClick={() => {
              props.changeTab(0);
            }}
      >
        All
      </button>

      <button
        className="transactionsHeader-button"
        style={{ color: props.displayTab === 1 ? '#05e0fa' : 'black' }}
        onClick={() => {
              props.changeTab(1);
            }}
      >
        Sent
      </button>

      <button
        className="transactionsHeader-button"
        style={{ color: props.displayTab === 2 ? '#05e0fa' : 'black' }}
        onClick={() => {
              props.changeTab(2);
            }}
      >
        Received
      </button>
    </div>
  </div>
);

export default TransactionsHeader;

