import React from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import PropTypes from 'prop-types';

import './SendPage.css';

class SendPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
      toId: 0,
      contacts: [],
      userId: this.props.userId
    };

  }

  componentDidMount = () => {
    axios('/contacts', { headers: { Authorization: this.props.token } })
      .then(result =>
        this.setState({ contacts: result.data }))
      .catch(err => console.log(err));
    
      const userId = this.state.userId;
      var pusher = new Pusher('cc03634ec726b20a38bf', {
        cluster: 'ap2',
        encrypted: true
      });
      var channel = pusher.subscribe('money-channel');
      channel.bind('send-money', function(data) {
      if(userId === data.to){
       alert(JSON.stringify(data));
      }
      });
  }

  sendMoney = token => {
    axios.post('/transaction/send', 
  { toId: this.state.toId, amount: this.state.amount, reason: 'boo' }, 
  { headers: { Authorization: token } });

  };

  render() {
    return (
      <div className="SendPage-container">
        <div className="SendPage-text">Send Money</div>
        <div className="SendPage-current">You have {this.props.amount}</div>
        <div className="SendPage-amount">
          <input
            type="number"
            min="0"
            max="100000"
            step="1"
            onChange={e => this.setState({ amount: Number(e.target.value) })}
          />
        </div>
        <div className="SendPage-contact">
          <select onChange={e => this.setState({toId: Number(e.target.value)})}>
            <option value="" selected disabled hidden>Choose here</option>
            {this.state.contacts.map(({ id, name }) =>
          (<option key={id} value={id}>{name}</option>))}
          </select>
        </div>
        <div className="SendPage-send-button">
          <button onClick={() => this.sendMoney(this.props.token)}>Send</button>
        </div>
      </div>);
  }
}

SendPage.propTypes = {
  userId: PropTypes.number,
}

SendPage.defaultValues = {
  userId: 0,
}

export default SendPage;
