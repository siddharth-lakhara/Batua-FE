import React from 'react';
import './transactionDisplayer.css';

const TransactionsDisplayer = props => (
  Object.keys(props.transactionObject).map(keys => (
    <div className="TransactionDisplayer-main">
      <div className="TransactionsDisplayer-sent">
        {props.transactionObject[keys].sent}
      </div>
      <div className="TransactionsDisplayer-amount">
        {props.transactionObject[keys].amount}
      </div>
      <div className="TransactionsDisplayer-status">
        {props.transactionObject[keys].status}
      </div>
      <div className="TransactionsDisplayer-id">
        {props.transactionObject[keys].transactionId}
      </div>
    </div>

  ))
);

export default TransactionsDisplayer;

