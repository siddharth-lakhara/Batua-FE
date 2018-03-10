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
  const currentUser = 'user1';
  let { data } = props;
  if (props.mode === 1) { // display sent transactions
    data = data.filter(row => (row.fromUser === currentUser));
    data = data.map((row) => {
      delete row.fromUser;
      return row;
    });
  } else if (props.mode === 2) { // display received transactions
    data = data.filter(row => (row.toUser === currentUser));
    data = data.map((row) => {
      delete row.toUser;
      return row;
    });
  }

  for (let i = 0; i < data.length; i += 1) {
    const rowele = [];
    for (const key in data[i]) {
      if (data[i].hasOwnProperty(key)) {
        const cell = <td>{data[i][key]}</td>;
        rowele.push(cell);
      }
    }
    const row = <tr>{rowele}</tr>;
    rows.push(row);
  }
  return rows;
};

class TransactionsDisplayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
    };
    this.updateHistory = this.updateHistory.bind(this);
  }

  componentDidMount() {
    fetch('/transactions/history', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJOYW1lIjoiSm9obl9Eb2UiLCJpYXQiOjE1MjA2NzI1MzQsImV4cCI6MTUyMDY3NjEzNH0.QmfnpDzoGaqRKozsXf2SyxD4Ivwi5Ep4hkIzzddcGvs',
      },
    })
      .then(data => data.json())
      .then((data) => {
        const { history } = data;
        this.updateHistory(history);
        console.log('Original data: ', data);
        console.log('History: ', history);
      });
  }

  updateHistory(history) {
    this.setState({
      history,
    }, () => {
      console.log('New State: ', this.state.history);
    });
  }
  render() {
    const dataAll = [{
      toUser: 'user1',
      fromUser: 'user2',
      amount: 5000,
      status: 'Sucessfull',
      transactionId: 1234567890,
    }, {
      toUser: 'user2',
      fromUser: 'user1',
      amount: 5000,
      status: 'Pending',
      transactionId: 1234509876,
    }];

    const headAll = ['Sent To', 'Sent By', 'Amount', 'Status', 'Transaction Id'];
    const headers = (
      <TableHead
        mode={this.props.displayTab}
        head={headAll}
      />
    );
    const allRows = (
      <TableData
        mode={this.props.displayTab}
        data={dataAll}
      />
    );

    return (
      <table width="100%" border="1px solid black">
        {headers}
        <tbody>
          {allRows}
        </tbody>
      </table>
    );
  }
}

export default TransactionsDisplayer;
