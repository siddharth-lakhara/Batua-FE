import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Header from '../../loggedIn/rightPane/header/header';
import UserInfo from '../../loggedIn/rightPane/userinfo/userinfo';

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
      ).then(() =>
        this.setState({ balance: this.state.balance - this.state.amount }))
        .then(() => this.props.home(this.state.balance));
    }
  };

  render() {
    return (
      <div className="SendPage-parent-container">
        <div className="rightPane-headerPane">
          <Header userName={this.props.userName} />
        </div>
        <div className="rightPane-UserInfo">
          <UserInfo balance={this.state.balance} userName={this.props.userName} />
        </div>
        <div className="SendPage-container">
          <div className="SendPage-text">Send Money</div>
          {/* <div className="SendPage-current">
              You have {this.state.balance} left
          </div> */}
          <div className="SendPage-amount-div">
            <span className="SendPage-label">Enter Amount: </span>
            <input
              className="SendPage-amount"
              type="number"
              min="0"
              max="100000"
              step="1"
              onChange={e => this.setState({ amount: Number(e.target.value) })}
            />
          </div>
          <div className="SendPage-contact-div">
            <span className="SendPage-label">Choose Contact: </span>

            <select className="SendPage-contact" onChange={e => this.setState({ toId: Number(e.target.value) })} defaultValue={0}>
              <option value="0" disabled hidden>Choose here</option>
              {this.state.contacts.map(({ id, name }) =>
          (<option key={id} value={id}>{name}</option>))}
            </select>
          </div>
          <div className="SendPage-reason-div">
            <span className="SendPage-label">Enter Reason: </span>

            <input
              className="SendPage-reason"
              onChange={e => this.setState({ reason: e.target.value })}
            />
          </div>
          <div className="SendPage-send-button-div">
            <button className="SendPage-send-button" onClick={() => this.sendMoney(this.props.token)}>Send</button>
          </div>
        </div>
      </div>
    );
  }
}

SendPage.propTypes = {
  token: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
};

export default SendPage;
