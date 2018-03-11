import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import './SendPage.css';

class SendPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      toId: 0,
      contacts: [],
      reason: '',
      balance: this.props.balance,
    };
  }

  componentDidMount = () => {
    axios('/contacts', { headers: { Authorization: this.props.token } })
      .then(result =>
        this.setState({ contacts: result.data }))
      .then(() => {
        axios('/balance', {
          headers:
        { Authorization: this.props.token },
        }).then((result) => {
          this.setState({ balance: result.data.balance });
        });
      })
      .catch(err => console.log(err));
  }

  sendMoney = (token) => {
    if (this.state.balance > this.state.amount) {
      axios.post(
        '/transaction/send',
        { toId: this.state.toId, amount: this.state.amount, reason: this.state.reason },
        { headers: { Authorization: token } },
      ).then(() => this.setState({ balance: this.state.balance - this.state.amount }));
    }
  };

  render() {
    return (
      <div className="SendPage-container">
        <div className="SendPage-text">Send Money</div>
        <div className="SendPage-current">
        You have {this.state.balance} left
        </div>
        <div className="SendPage-amount">
          <input
            type="number"
            min="0"
            max="100000"
            step="1"
            onChange={e => this.setState({ amount: Number(e.target.value) })}
          />
        </div>
        <div className="SendPage-contact">
          <select onChange={e => this.setState({ toId: Number(e.target.value) })} defaultValue={0}>
            <option value="0" disabled hidden>Choose here</option>
            {this.state.contacts.map(({ id, name }) =>
          (<option key={id} value={id}>{name}</option>))}
          </select>
        </div>
        <div className="SendPage-reason">
          <input
            onChange={e => this.setState({ reason: e.target.value })}
          />
        </div>
        <div className="SendPage-send-button">
          <button onClick={() => this.sendMoney(this.props.token)}>Send</button>
        </div>
      </div>);
  }
}

SendPage.propTypes = {
  token: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
};

export default SendPage;
