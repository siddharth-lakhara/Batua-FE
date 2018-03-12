import React from 'react';
import './transactionDisplayer.css';

const restructureData = (historyObject) => {
  const newObject = Object.keys(historyObject).map(index => ({
    toUser: historyObject[index].toUser,
    fromUser: historyObject[index].fromUser,
    amount: historyObject[index].amount,
    status: historyObject[index].status,
    transactionId: historyObject[index].transactionId,
    category: historyObject[index].category,
    reason: historyObject[index].reason,
  }));

  return newObject;
};

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
  const { currentUser } = props;
  // let { data } = props;
  let data = restructureData(props.data);
  // console.log(data);
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

  for (let i = 0; i < Math.min(data.length, 5); i += 1) {
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
        Authorization: this.props.authToken,
      },
    })
      .then(data => data.json())
      .then((data) => {
        const { history } = data;
        this.updateHistory(history);
      });
  }

  updateHistory(history) {
    this.setState({
      history,
    }, () => {
      console.log('history: ', this.state.history);
    });
  }

  render() {
    const headAll = ['Sent To', 'Sent By', 'Amount', 'Status', 'Transaction Id', 'Category', 'Reason'];
    const headers = (
      <TableHead
        mode={this.props.displayTab}
        head={headAll}
      />
    );
    const allRows = (
      <TableData
        mode={this.props.displayTab}
        currentUser={this.props.userName}
        data={this.state.history}
        // data={this.state.history}
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
