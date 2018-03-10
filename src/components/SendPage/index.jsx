import React from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

import PropTypes from 'prop-types';

import './SendPage.css';



class SendPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      toId: 0,
    };
  }

  sendMoney = token => axios.post('/transaction/send', { toId: this.state.toId, amount: this.state.amount, reason: 'boo' }, { headers: { Authorization: token } });

  render() {
    return (
      <div className="SendPage-container">
        <div className="SendPage-text">Send Money</div>
        <div className="SendPage-amount">
          <input
            type="number"
            min="0.00"
            max="100000"
            step="1"
            onChange={e => this.setState({ amount: Number(e.target.value) })}
          />
        </div>
        <div className="SendPage-contact">
          <select onChange={e => this.setState({toId: Number(e.target.value)})}>
            <option value="" selected disabled hidden>Choose here</option>
            {this.props.contacts.map(({ id, name }) =>
          (<option key={id} value={id}>{name}</option>))}
          </select>
        </div>
        <div className="SendPage-send-button">
          <button onClick={() => this.sendMoney(this.props.token)}>Send</button>
        </div>
      </div>);
  }
}

export default SendPage;
