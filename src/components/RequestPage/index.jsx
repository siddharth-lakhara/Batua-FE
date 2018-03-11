import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import './RequestPage.css';

class RequestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      toId: 0,
      contacts: [],
      reason: '',
    };
  }

  componentDidMount = () => {
    axios('/contacts', { headers: { Authorization: this.props.token } })
      .then(result =>
        this.setState({ contacts: result.data }))
      .catch(err => console.log(err));
  }

  requestMoney = (token) => {
    axios.post(
      '/transaction/request',
      {
        toId: this.state.toId,
        amount: this.state.amount,
        reason: this.state.reason,
      },
      { headers: { Authorization: token } },
    );
  };

  render() {
    return (
      <div className="RequestPage-container">
        <div className="RequestPage-text">Request Money</div>
        <div className="RequestPage-amount">
          <input
            type="number"
            min="0"
            max="100000"
            step="1"
            onChange={e => this.setState({ amount: Number(e.target.value) })}
          />
        </div>
        <div className="RequestPage-contact">
          <select onChange={e => this.setState({ toId: Number(e.target.value) })}>
            <option value="" selected disabled hidden>Choose here</option>
            {this.state.contacts.map(({ id, name }) =>
          (<option key={id} value={id}>{name}</option>))}
          </select>
        </div>
        <div className="RequestPage-reason">
          <input
            onChange={e => this.setState({ reason: e.target.value })}
          />
        </div>
        <div className="RequestPage-request-button">
          <button onClick={() => this.requestMoney(this.props.token)}>Request</button>
        </div>
      </div>);
  }
}

RequestPage.propTypes = {
  token: PropTypes.string.isRequired,
};

export default RequestPage;
