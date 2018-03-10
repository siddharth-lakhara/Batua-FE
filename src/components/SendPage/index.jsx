import React from 'react';
import PropTypes from 'prop-types';

import './SendPage.css';

const sendMoney = () => alert('Pressed');

const SendPage = ({ contacts }) => (
  <div className="SendPage-container">
    <div className="SendPage-text">Send Money</div>
    <div className="SendPage-amount">
      <input type="number" min="0.00" max="100000.00" step="0.01" />
    </div>
    <div className="SendPage-contact">
      <select>
        {contacts.map(element =>
          (<option value={element}>{element}</option>))}
      </select>
    </div>
    <div className="SendPage-send-button">
      <button onClick={sendMoney}>Send</button>
    </div>
  </div>
);

SendPage.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.string),
};

SendPage.defaultProps = {
  contacts: ['User1', 'User2'],
};
export default SendPage;
