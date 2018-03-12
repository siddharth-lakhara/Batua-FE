import React from 'react';
import ReactTable from 'react-table';
import './transactionDisplayer.css';

const TransactionsDisplayer = (props) => {
  const dataAll = [{
    toUser: 'user1',
    fromUser: 'user2',
    amount: 5000,
    status: 'Sucessfull',
    transactionId: 1234567890,
  }];

  const columnsAll = [{
    Header: 'Sent To',
    accessor: 'toUser',
  }, {
    Header: 'Sent by',
    accessor: 'fromUser',
  }, {
    Header: 'Amount',
    accessor: 'amount',
    Cell: props => (<span>{props.value}</span>),
  }, {
    Header: 'Status',
    accessor: 'status',
  }, {
    Header: 'transaction Id',
    accessor: 'transactionId',
  }];

  const columnsSent = [{
    Header: 'Sent to',
    accessor: (d) => {
      const sentArray = d.filter(e => e.fromUser === 'user1');
      return sentArray.toUser;
    },
  }, {
    Header: 'Amount',
    accessor: 'amount',
  }, {
    Header: 'Status',
    accessor: 'status',
  }, {
    Header: 'transaction Id',
    accessor: 'transactionId',
  }];

  const columnsRcvd = [{
    Header: 'Sent By',
    accessor: (d) => {
      const rcvdArray = d.filter(e => e.fromUser === 'user1');
      return rcvdArray.toUser;
    },
  }, {
    Header: 'Amount',
    accessor: 'amount',
  }, {
    Header: 'Status',
    accessor: 'status',
  }, {
    Header: 'transaction Id',
    accessor: 'transactionId',
  }];

  switch (props.displayTab) {
    case 0:
      return (
        <ReactTable
          data={dataAll}
          columns={columnsAll}
        />
      );
    case 1:
      return (
        <ReactTable
          data={dataAll}
          columns={columnsSent}
        />
      );
    case 2:
      return (
        <ReactTable
          data={dataAll}
          columns={columnsRcvd}
        />
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

