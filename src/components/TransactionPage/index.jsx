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

  approve = (token) => {
    axios.post(
      '/transaction/approve',
      {
        toId: this.state.toId,
        amount: this.state.amount,
        reason: this.state.reason,
      },
      { headers: { Authorization: token } },
    );
  };

  pending = () => this.state.history.filter(transaction => transaction.status === 'PENDING');

  completed = () => this.state.history.filter(transaction => transaction.status === 'completed');

  render() {
    return (
      <div className="TransactionPage-container">
        <div className="TransactionPage-pending">Pending Transactions</div>
        <div className="TransactionPage-pending-list">{JSON.stringify(this.pending())}</div>
        <div className="TransactionPage-Completed">Completed Transactions</div>
        <div className="TransactionPage-completed-list">{JSON.stringify(this.completed())}</div>
      </div>);
  }
}

TransactionPage.propTypes = {
  token: PropTypes.string.isRequired,
};

export default TransactionPage;
