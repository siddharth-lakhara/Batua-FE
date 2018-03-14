import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Header from '../../loggedIn/rightPane/header/header';
import UserInfo from '../../loggedIn/rightPane/userinfo/userinfo';

import './RequestPage.css';

class RequestPage extends React.Component {
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
    ).then(() => this.props.home(this.state.balance)).then(() => {
      axios('/balance', {
        headers:
      { Authorization: this.props.token },
      }).then((result) => {
        this.setState({ balance: result.data.balance });
      });
    })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="RequestPage-parent-container">
        <div className="rightPane-headerPane">
          <Header userName={this.props.userName} />
        </div>
        <div className="rightPane-UserInfo">
          <UserInfo balance={this.state.balance} userName={this.props.userName} />
        </div>
        <div className="RequestPage-container">
          <div className="RequestPage-text">Request Money</div>
          {/* <div className="RequestPage-current">
              You have {this.state.balance} left
          </div> */}
          <div className="RequestPage-amount-div">
            <span className="RequestPage-label">Enter Amount: </span>
            <input
              className="RequestPage-amount"
              type="number"
              min="0"
              max="100000"
              step="1"
              onChange={e => this.setState({ amount: Number(e.target.value) })}
            />
          </div>
          <div className="rRequestPage-contact-div">
            <span className="RequestPage-label">Choose Contact: </span>

            <select className="RequestPage-contact" onChange={e => this.setState({ toId: Number(e.target.value) })} defaultValue={0}>
              <option value="0" disabled hidden>Choose here</option>
              {this.state.contacts.map(({ id, name }) =>
          (<option key={id} value={id}>{name}</option>))}
            </select>
          </div>
          <div className="RequestPage-reason-div">
            <span className="RequestPage-label">Enter Reason: </span>

            <input
              className="RequestPage-reason"
              onChange={e => this.setState({ reason: e.target.value })}
            />
          </div>
          <div className="RequestPage-send-button-div">
            <button className="RequestPage-send-button" onClick={() => this.requestMoney(this.props.token)}>Request</button>
          </div>
        </div>
      </div>
    );
  }
}

RequestPage.propTypes = {
  token: PropTypes.string.isRequired,
};

export default RequestPage;
