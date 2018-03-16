import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

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
    const contacts = this.state.contacts;
    const contactCards = [];
    for (let i = 0; i < contacts.length; i += 1) {
      contactCards.push(<ContactCard token={this.props.token} transactions={this.state.transactions} userName={this.props.userName} tableType="contacts" currentContact={contacts[i].name} src={`/images/${i + 1}.jpg`} />);
    }
    return contactCards;
  }

  render() {
    return (
      <div className="AddContact-parent-container">
        <div className="rightPane-headerPane">
          <Header />
        </div>
        <div className="rightPane-UserInfo">
          <UserInfo balance={this.props.balance} />
        </div>
        <div className="AddContact-box">
          <div className="AllContacts-container">
            {this.showAllContacts()}
            <div>
              {/* <Table /> */}
            </div>
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
