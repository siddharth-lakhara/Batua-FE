import React from 'react';
import ReactTable from 'react-table';
import './transactionDisplayer.css';

const TableHead = props => (
  props.head.map(e => (
    <th>
      {e}
    </th>
  ))
);

const TableData = (props) => {
  const rows = [];
  for (let i = 0; i < props.data.length; i += 1) {
    const rowele = [];
    for (const key in props.data[i]) {
      if (props.data[i].hasOwnProperty(key)) {
        const cell = <td> {props.data[i][key]} </td>;
        rowele.push(cell);
      }
    }
    const row = <tr> {rowele} </tr>;
    rows.push(row);
  }
  return rows;
};

const TransactionsDisplayer = (props) => {
  const dataAll = [{
    toUser: 'user1',
    fromUser: 'user2',
    amount: 5000,
    status: 'Sucessfull',
    transactionId: 1234567890,
  }];

  const headAll = ['Sent To', 'Sent By', 'Amount', 'Status', 'Transaction Id'];

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
        <div>
          <TableHead
            head={headAll}
          />
          <TableData
            data={dataAll}
          />
        </div>
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

