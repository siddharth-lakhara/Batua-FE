import React from 'react';
import './transactionDisplayer.css';

const TransactionsDisplayer = (props) => {
  switch (props.displayTab) {
    case 0:
      return (
        <div>
          All transactions tab
        </div>
      );
    case 1:
      return (
        <div>
          Sent tab
        </div>
      );
    case 2:
      return (
        <div>
          Recieve tab
        </div>
      );
    default:
      return (
        <div>
          Default Tab
        </div>
      );
  }

  // return (
  //   Object.keys(props.transactionObject).map(keys => (
  //     <div className="TransactionDisplayer-main">
  //       <div className="TransactionsDisplayer-sent">
  //         {props.transactionObject[keys].sent}
  //       </div>
  //       <div className="TransactionsDisplayer-amount">
  //         {props.transactionObject[keys].amount}
  //       </div>
  //       <div className="TransactionsDisplayer-status">
  //         {props.transactionObject[keys].status}
  //       </div>
  //       <div className="TransactionsDisplayer-id">
  //         {props.transactionObject[keys].transactionId}
  //       </div>
  //     </div>

  //   ))
  // );
};


export default TransactionsDisplayer;

