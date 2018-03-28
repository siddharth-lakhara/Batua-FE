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
      table: [],
      showHide: [],
    };
  }

  componentDidMount = () => {
    axios('/transactions/history', { headers: { Authorization: this.props.token } })
      .then((result) => {
        this.setState({ transactions: result.data.history });
        // console.log(result.data);
      })
      .catch(err => console.log(err));

    axios('/contacts/getAllContacts', { headers: { Authorization: this.props.token } })
      .then((result) => {
        this.setState({ contacts: result.data }, () => {
          for (let i = 0; i < this.state.contacts.length; i += 1) {
            const arr = this.state.showHide;
            arr[i] = 'Show Transaction';
            const t = this.state.table;
            t[i] = '';
            this.setState({ showHide: arr, table: t });
          }
        });
        // console.log(result.data);
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

  showTransactions = (contact, index) => {
    const arr = this.state.table;
    const a = this.state.showHide;
    if (this.state.table[index] === '') {
      arr[index] = (<div className="AllContact-showTransaction-table"><Tables
        tableType="contacts"
        currentTab="Send"
        dataAll={this.state.transactions}
        crop="crop"
        currentUser={this.props.userName}
        currentContact={contact}
      />
                    </div>);
      this.setState({
        table: arr,
      });
      a[index] = 'Hide Transaction';
      this.setState({ showHide: a });
    } else {
      arr[index] = '';
      a[index] = 'Show Transaction';
      this.setState({
        table: arr, showHide: a,
      });
    }
  }
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
          <div className="AllContact-tt">{this.state.table[i]}</div>
          <button className="AllContacts-show-transaction-div" onClick={() => this.showTransactions(contacts[i].name, i)}>{this.state.showHide[i]}</button>
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
