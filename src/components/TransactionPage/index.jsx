import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import './TransactionPage.css';

class TransactionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
    };
  }

  componentDidMount = () => {
    axios('/transactions/history', { headers: { Authorization: this.props.token } })
      .then(result =>
        this.setState({ history: result.data.history }))
      .catch(err => console.log(err));
  }

  approve = (transactionId, decision) => {
    axios.patch(
      '/transaction/approve',
      {
        transactionId,
        decision,
      },
      { headers: { Authorization: this.props.token } },
    );
  };

  selector = id => (
    <div>
      <button onClick={() => this.approve(id, 'YES')}>Yes</button>
      <button onClick={() => this.approve(id, 'NO')}>No</button>
    </div>)

  filtered = status => this.state.history
    .filter(transaction => transaction.status === status)
    .map(item => (
      <tr className="Transaction-row" key={item.transactionId}>
        <td>{item.fromId}</td>
        <td>{item.toId}</td>
        <td>{item.amount}</td>
        <td>{item.reason}</td>
        <td>{item.status === 'PENDING' ? this.selector(item.transactionId) : null}</td>
      </tr>
    ))


  render() {
    return (
      <div className="TransactionPage-container">
        <div className="TransactionPage-pending">Pending Transactions</div>
        <div className="TransactionPage-pending-list">
          <table>
            <thead className="Transaction-header">
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Reason</th>
                <th>Accept/Reject</th>
              </tr>
            </thead>
            <tbody>{this.filtered('PENDING')}</tbody>
          </table>
        </div>
        <div className="TransactionPage-Completed">Completed Transactions</div>
        <div className="TransactionPage-completed-list">
          <table>
            <thead className="Transaction-header">
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>{this.filtered('COMPLETED')}</tbody>
          </table>
        </div>
      </div>);
  }
}

TransactionPage.propTypes = {
  token: PropTypes.string.isRequired,
};

export default TransactionPage;
