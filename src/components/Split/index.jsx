import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


import './Split.css';

class Split extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      totalAmount: props.amount,
      yourAmount: props.amount,
      amount: [],
      toId: [],
      contacts: [],
      reason: props.reason,
      contactId: [],
      balance: this.props.balance,
    };
  }

  componentDidMount = () => {
    axios(
      '/contacts/getAllContacts',
      { headers: { Authorization: this.props.token } },
    )
      .then((result) => {
        const contacts = [];
        const contactsPrototype = result.data;
        for (let i = 0; i < result.data.length; i += 1) {
          contacts.push([...result.data]);
        }
        this.setState({ contacts, contactsPrototype });
        console.log(result.data);
      })
      .catch(err => console.log(err));
  }

  capitalize = word => (word[0]).toUpperCase() + word.slice(1);

  Split = (token) => {
    console.log(this.state.toId);
    for (let i = 0; i < this.state.num; i += 1) {
      axios.post(
        '/transaction/request',
        {
          toId: this.state.toId[i],
          amount: this.state.amount[i],
          reason: `split - ${this.state.reason}`,
        },
        { headers: { Authorization: token } },
      ).then((response) => {
        console.log(response);
      });
    }
  };

  addContact = () => {
    const num = Math.min(this.state.num + 1, this.state.contactsPrototype.length);

    let amountPerPerson = this.state.totalAmount / (num + 1);
    amountPerPerson = Math.round(amountPerPerson * 100) / 100;
    const amount = [];
    for (let i = 0; i < num; i += 1) {
      amount[i] = amountPerPerson;
    }
    const yourAmount = this.state.totalAmount - (num * amountPerPerson);
    this.setState({ amount, num, yourAmount });
  }

  renderList = () => {
    const list = [];
    for (let i = 0; i < this.state.num; i += 1) {
      list.push((
        <div className="split-list-item">
          <span className="Split-label">Choose Contact: </span>

          <select
            className="Split-contact"
            onChange={(e) => {
              const { toId, contactId, contacts } = this.state;
              if (toId[i]) {
                const index = this.state.contactsPrototype.findIndex(x => x.id === toId[i]);
                for (let j = 0; j < this.state.contacts.length; j += 1) {
                  if (j !== i) {
                    contacts[j].push(this.state.contactsPrototype[index]);
                  }
                }
              }
              toId[i] = Number(e.target.value);
              contactId[i] = Number(e.target.value);


              for (let j = 0; j < this.state.contacts.length; j += 1) {
                const index = contacts[j].findIndex(x => x.id === Number(e.target.value));
                if (index > -1) {
                  if (j !== i) {
                    contacts[j].splice(index, 1);
                  }
                }
              }
              this.setState({ toId, contactId, contacts });
            }}
            value={this.state.contactId[i]}
          >
            <option
              value={null}
              disabled
              hidden
              selected
            >Choose here
            </option>
            {this.state.contacts[i].map(({ id, name }) => (<option key={id} value={id}>{name}</option>))}
          </select>
          <div className="Split-amount-div">
            <span className="Split-label">Enter Amount: </span>
            <input
              className="Split-amount"
              type="number"
              min="0"
              max={this.state.amount[i] + this.state.yourAmount}
              step=".01"
              onChange={(e) => {
                const { amount } = this.state;
                amount[i] = Number(e.target.value);
                let totalContactsAmount = 0;
                for (let j = 0; j < this.state.num; j += 1) {
                  totalContactsAmount += amount[j];
                }
                const yourAmount = this.state.totalAmount - totalContactsAmount;
                this.setState({ amount, yourAmount });
              }}
              value={this.state.amount[i]}
            />
          </div>
        </div>
      ));
    }
    return list;
  }

  render() {
    return (
      <div className="Split-parent-container">
        <div className="Split-container">
          <div className="Split-text">{this.capitalize(this.props.type)}</div>
          {/* <div className="SendPage-current">
              You have {this.state.balance} left
          </div> */}
          <div className="split-list">
            <div className="split-list-item">
              <span className="Split-label">You: </span>
              <span className="Split-amount">{this.state.yourAmount} </span>
            </div>
            {this.renderList()}
            <div className="Split-button-div">
              <button
                className="Split-button"
                onClick={() => this.addContact()}
              >
                add
              </button>
            </div>
          </div>


          <div className="Split-button-div">
            <button
              className="Split-button"
              onClick={() => this.Split(this.props.token)}
            >
              {this.capitalize(this.props.type)}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Split;
