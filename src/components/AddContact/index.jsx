import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './AddContact.css';

class AddContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: '',
    };
  }

  componentDidMount = () => {
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
        <div className="AddContact-box">
          <div className="AddContact-contain">
            <div className="AddContact-text">Add Contact</div>
            <div className="AddContact-two-div">
              <div className="AddContact-reason-div">
                <input
                  className="AddContact-userName"
                  placeholder="Enter UserName"
                  onChange={e => this.setState({ contact: e.target.value })}
                />
              </div>
              <div className="AddContact-send-button-div">
                <button className="AddContact-Add-button" onClick={() => this.addContact(this.props.token)}>ADD</button>
              </div>
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
