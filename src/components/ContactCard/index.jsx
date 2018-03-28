import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import './ContactCard.css';

class ContactCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    };
  }

  totalSend = (currentContact, transactions) => {
    let total = 0;
    for (let i = 0; i < transactions.length; i += 1) {
      if (transactions[i].fromUser === this.props.userName && transactions[i].toUser === currentContact && transactions[i].status === 'COMPLETED') {
        total += transactions[i].amount;
      }
    }
    // console.log('totalSend:', total);

    return total;
  }


  totalReceived = (currentContact, transactions) => {
    let total = 0;
    for (let i = 0; i < transactions.length; i += 1) {
      if (transactions[i].fromUser === currentContact && transactions[i].toUser === this.props.userName && transactions[i].status === 'COMPLETED') {
        total += transactions[i].amount;
      }
    }
    // console.log('totalRecived:', total);
    return total;
  }

  render() {
    return (
      <div className="ContactCard-container">
        <div className="ContactCard-contact-image-div"><img className="ContactCard-contact-image" src={this.props.src} /></div>
        <div className="ContactCard-currentContact-name">{this.props.currentContact}</div>
        <div className="ContactCard-currentContact-info-div">
          <div className="ContactCard-currentContact-total-transfer">
            <div className="ContactCard-currentContact-total-sent"><div className="ContactCard-amount"> Rs    {this.totalSend(this.props.currentContact, this.props.transactions)}</div><div className="ContactCard-total">Total Sent</div></div>
            <div className="ContactCard-line" />
            <div className="ContactCard-currentContact-total-received"><div className="ContactCard-amount"> Rs    {this.totalReceived(this.props.currentContact, this.props.transactions)}</div><div className="ContactCard-total">Total Received</div></div>
          </div>
          <div className="ContactCard-currentContact-buttons-div">
            <button
              className="ContactCard-currentContact-button-sent"
              onClick={() => this.props.send(this.props.currentId)}
            >send
            </button>
            <button
              className="ContactCard-currentContact-button-receive"
              onClick={() => this.props.request(this.props.currentId)}
            >request
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default ContactCard;
