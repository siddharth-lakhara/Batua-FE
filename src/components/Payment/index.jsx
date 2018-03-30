import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


import './Payment.css';

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      toId: this.props.contactId,
      contacts: [],
      reason: '',
      contactId: this.props.contactId,
      balance: this.props.balance,
    };
  }

  componentDidMount = () => {
    axios(
      '/contacts/getAllContacts',
      { headers: { Authorization: this.props.token } },
    )
      .then((result) => {
        this.setState({ contacts: result.data });
        // console.log(result.data);
      })
      .catch(err => console.log(err));
  }

  capitalize = word => (word[0]).toUpperCase() + word.slice(1);

  payment = (token) => {
    if (this.state.balance > this.state.amount || this.props.type !== 'send') {
      axios.post(
        `/transaction/${this.props.type}`,
        {
          toId: this.state.toId,
          amount: this.state.amount,
          reason: this.state.reason,
        },
        { headers: { Authorization: token } },
      ).then(() => {
        this.props.transactionsUpdate();
        if (this.props.type === 'send') {
          const newBalance = this.state.balance - this.state.amount;
          this.setState({ balance: newBalance });
          this.props.updateBalance(newBalance);
          this.myFunction();
        } else {
          this.myFunction();
        }
      });
    } else {
      this.lowBalance();
    }
  };

  myFunction = () => {
    const popup = document.getElementById('myPopup');
    popup.classList.remove('show');
    popup.classList.remove('hide');
    popup.classList.add('show');
    setTimeout(() => {
      const p = document.getElementById('myPopup');
      //  p.classList.toggle('show');
      p.classList.add('hide');
      document.getElementById('amount').value = '';
      document.getElementById('reason').value = '';
    }, 1000);
  }

  lowBalance = () => {
    const popup = document.getElementById('pop');
    popup.classList.remove('show');
    popup.classList.remove('hide');
    popup.classList.add('show');
    setTimeout(() => {
      const p = document.getElementById('pop');
      //  p.classList.toggle('show');
      p.classList.add('hide');
      document.getElementById('amount').value = '';
      document.getElementById('reason').value = '';
    }, 1000);
  }

  render() {
    return (
      <div className="Payment-parent-container">
        <div className="Payment-container">
          <div className="Payment-text">{this.capitalize(this.props.type)} Money</div>
          {/* <div className="SendPage-current">
              You have {this.state.balance} left
          </div> */}
          <div className="payment-amount-contact-div">
            <div className="Payment-amount-div">
              <input
                className="Payment-amount"
                id="amount"
                placeholder="Enter Amount"
                type="number"
                min="0"
                max="100000"
                step=".01"
                onChange={e => this.setState({ amount: Number(e.target.value) })}
              />
            </div>
            <div className="Payment-contact-div">
              <select
                className="Payment-contact"
                id="contacts"
                onChange={e => this.setState({ toId: Number(e.target.value), contactId: Number(e.target.value) })}
                value={this.state.contactId}
              >
                <option
                  value="0"
                  disabled
                  hidden
                >Choose here
                </option>
                {this.state.contacts.map(({ id, name }) =>
          (<option key={id} value={id}>{name}</option>))}
              </select>
            </div>
          </div>
          <div className="Payment-reason-div">
            <input
              className="Payment-reason"
              id="reason"
              placeholder="Enter Reason"
              onChange={e => this.setState({ reason: e.target.value })}
            />
          </div>
          <div className="Payment-button-div">
            <button
              className="Payment-button"
              onClick={() => this.payment(this.props.token)}
            >{this.capitalize(this.props.type)}
            </button>
            <span className="popuptext" id="myPopup">{this.props.type}ing Successful</span>
            <span className="pop" id="pop">Low Balance!</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
