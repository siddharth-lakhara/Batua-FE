import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ContactCard from '../ContactCard';
import Tables from '../Tables';

import './AllContacts.css';

class AllContacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      transactions: [],
    };
  }

  componentDidMount = () => {
    axios('/transactions/history', { headers: { Authorization: this.props.token } })
      .then((result) => {
        this.setState({ transactions: result.data.history });
        console.log(result.data);
      })
      .catch(err => console.log(err));

    axios('/contacts/getAllContacts', { headers: { Authorization: this.props.token } })
      .then((result) => {
        this.setState({ contacts: result.data });
        console.log(result.data);
      })
      .catch(err => console.log(err));
  }
  // addContact = (token) => {
  //   axios.post(
  //     '/contacts/addContact',
  //     {
  //       contact: this.state.contact,
  //     },
  //     { headers: { Authorization: token } },
  //   ).then(reply => alert(reply.data.message));
  // };

  showAllContacts = () => {
    const { contacts } = this.state;
    const contactCards = [];
    for (let i = 0; i < contacts.length; i += 1) {
      const contact = (
        <div className="AllContacts-contactCard">
          <ContactCard
            token={this.props.token}
            transactions={this.state.transactions}
            userName={this.props.userName}
            currentContact={contacts[i].name}
            currentId={contacts[i].id}
            src={`/images/${contacts[i].name}.jpg`}
            send={id => this.props.send(id)}
            request={id => this.props.request(id)}
          />
          {/* <Tables
            tableType="contacts"
            currentTab="Send"
            dataAll={this.state.transactions}
            crop="crop"
            currentUser={this.props.userName}
            currentContact={contacts[i].name}
          /> */}
          <button className="AllContacts-show-transaction-div"> Show Transactions</button>
        </div>);
      contactCards.push(contact);
    }
    return contactCards;
  }

  render() {
    return (
      <div className="AllContacts-parent-container">
        <div className="AllContacts-box">
          <div className="AllContacts-container">
            {this.showAllContacts()}
            <div />
          </div>
        </div>
      </div>
    );
  }
}

AllContacts.propTypes = {
  token: PropTypes.string.isRequired,
};

export default AllContacts;
