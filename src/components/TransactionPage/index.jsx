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
    this.getHistory();
  }

  getHistory = () => {
    axios('/transactions/history', { headers: { Authorization: this.props.token } })
      .then((result) => {
        this.setState({ history: result.data.history });
      })
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
    ).then(() => this.getHistory());
  };

  selector = id => (
    <div>
      <button
        className="Approve-button yes"
        onClick={() => {
          this.approve(id, 'YES');
          this.forceUpdate();
        }}
      >Accept
      </button>/
      <button
        className="Approve-button no"
        onClick={() => {
          this.approve(id, 'NO');
          this.forceUpdate();
        }}
      >Reject
      </button>
    </div>)

  filtered = status => this.state.history
    .filter(transaction => transaction.status === status)
    .map(item => (
      <tr className="Transaction-row" key={item.transactionId}>
        <td>{item.fromUser}</td>
        <td>{item.toUser}</td>
        <td>{item.amount}</td>
        <td>{item.reason}</td>
        {item.status === 'PENDING' ? <td>{this.selector(item.transactionId)}</td> : null}
      </tr>
    ))

  render() {
    return (
      <div className="TransactionPage-container">
        <div className="TransactionPage-title pending">Pending Transactions</div>
        <div className="TransactionPage-pending-list">
          <table className="TransactionPage-table" cellpadding="0" cellspacing="0">
            <thead className="Transaction-header">
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Reason</th>
                <th>Request</th>
              </tr>
            </thead>
            <tbody>{this.filtered('PENDING')}</tbody>
          </table>
        </div>
        <div className="TransactionPage-title completed">Completed Transactions</div>
        <div className="TransactionPage-completed-list">
          <table className="TransactionPage-table" cellpadding="0" cellspacing="0">
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
        <div className="TransactionPage-title failed">Failed Transactions</div>
        <div className="TransactionPage-Failed-list">
          <table className="TransactionPage-table" cellpadding="0" cellspacing="0">
            <thead className="Transaction-header">
              <tr>
                <th>From</th>
                <th>To</th>
                <th>Amount</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>{this.filtered('FAILED')}</tbody>
          </table>
        </div>
      </div>);
  }
}

TransactionPage.propTypes = {
  token: PropTypes.string.isRequired,
};

export default TransactionPage;
