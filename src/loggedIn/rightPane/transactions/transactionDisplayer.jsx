import React from 'react';
import './transactionDisplayer.css';

const TableHead = (props) => {
  const { head } = props;

  if (props.mode === 2) {
    const index = head.indexOf('Sent To');
    head.splice(index, 1);
  } else if (props.mode === 1) {
    const index = head.indexOf('Sent By');
    head.splice(index, 1);
  }

  const AllHeadColumns = head.map((e) => {
    const headColumn = <th>{e}</th>;
    return headColumn;
  });

  return (
    <tr>
      {AllHeadColumns}
    </tr>
  );
};


const TableData = (props) => {
  const rows = [];
  const currentUser = 1;
  let { data } = props;
  if (props.mode === 1) { // display sent transactions
    data = data.filter(row => (row.fromUser === currentUser));
  } else if (props.mode === 2) {
    data = data.filter(row => (row.toUser === currentUser));
  }

  for (let i = 0; i < data.length; i += 1) {
    const rowele = [];
    for (const key in data[i]) {
      if (data[i].hasOwnProperty(key)) {
        const cell = <td> {data[i][key]} </td>;
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
  const headers = (
    <TableHead
      mode={props.displayTab}
      head={headAll}
    />
  );
  const allRows = (
    <TableData
      mode={props.displayTab}
      data={dataAll}
    />
  );

  return (
    <table width="100%" border="1px solid black">
      {headers}
      {allRows}
    </table>
  );
};

export default TransactionsDisplayer;
