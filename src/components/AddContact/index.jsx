import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Header from '../../loggedIn/rightPane/header/header';
import UserInfo from '../../loggedIn/rightPane/userinfo/userinfo';

import './AddContact.css';

class AddContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: '',
    };
  }

  componentDidMount = () => {
    axios('/contacts', { headers: { Authorization: this.props.token } })
      .then(result =>
        this.setState({ contacts: result.data }))
      .catch(err => console.log(err));
  }

  addContact = (token) => {
    axios.post(
      '/contacts/addContact',
      {
        contact: this.state.contact,
      },
      { headers: { Authorization: token } },
    ).then(reply => alert(reply.data.message));
  };

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
          <div className="AddContact-container">
            <div className="AddContact-text">Add Contact</div>
            <div className="AddContact-reason-div">
              <span className="AddContact-label">Enter UserName: </span>

              <input
                className="AddContact-userName"
                onChange={e => this.setState({ contact: e.target.value })}
              />
            </div>
            <div className="AddContact-send-button-div">
              <button className="AddContact-send-button" onClick={() => this.addContact(this.props.token)}>ADD</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddContact.propTypes = {
  token: PropTypes.string.isRequired,
};

export default AddContact;
