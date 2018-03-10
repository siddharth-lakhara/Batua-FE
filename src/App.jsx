import React, { Component } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import Sidebar from './loggedIn/sidebar';
import RightPane from './loggedIn/rightPane';
import SendPage from './components/SendPage';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: 'send',
      contacts: [],
      token: prompt('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJOYW1lIjoiSm9obl9Eb2UiLCJpYXQiOjE1MjA3MTU4MzAsImV4cCI6MTUyMDcxOTQzMH0.2ePRhXag99DwpJOYdJFfhRElh_CmYrHS34pjoVXN49o'),
      userId: 0,
    };
  }


  componentDidMount() {
    this.setState({ userId: jwtDecode(this.state.token).userId });

    axios('/contacts', { headers: { Authorization: this.state.token } })
      .then(result =>
        this.setState({ contacts: result.data }))
      .catch(err => console.log(err));

    const pusher = new Pusher('cc03634ec726b20a38bf', {
      cluster: 'ap2',
      encrypted: true,
    });

    const channel = pusher.subscribe('money-channel');
    channel.bind('send-money', (data) => {
      if (data.to === this.state.userId) { alert(JSON.stringify(data)); }
    });
  }

  render() {
    if (this.state.currentState === 'main') { // when user is loggid in
      return (
        <div className="app-main">
          <Sidebar />
          <RightPane />
        </div>
      );
    }

    return ( // show login page
      <div className="app-main">
        <Sidebar />
        <SendPage contacts={this.state.contacts} token={this.state.token} />
      </div>
    );
  }
}

export default App;
