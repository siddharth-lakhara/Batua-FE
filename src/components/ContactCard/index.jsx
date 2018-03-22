import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import './ContactCard.css';

class ContactCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      transactions: [],
    };
  }
  render() {
    return (
      <div className="ContactCard-container">
        <div className="ContactCard-contact-image-div"><img className="ContactCard-contact-image" src={this.props.src} /></div>
        <div className="ContactCard-currentContact-name">{this.props.currentContact}</div>
        <div className="ContactCard-currentContact-info-div">
          <div className="ContactCard-currentContact-total-transfer">
            <div className="ContactCard-currentContact-total-sent">Total Sent:{this.totalSend}</div>
            <div className="ContactCard-currentContact-total-received">Total Received:{this.totalReceived}</div>
          </div>
          <div className="ContactCard-currentContact-buttons-div">
            <button
              className="ContactCard-currentContact-button"
              onClick={() => this.props.send(this.props.currentId)}
            >send
            </button>
            <button
              className="ContactCard-currentContact-button"
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
