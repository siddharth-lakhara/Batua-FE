import React, { Component } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import NavigationBar from '../NavigationBar';
import StatusBar from '../StatusBar';
import UserInfo from '../UserInfo';
import AddContact from '../AddContact';

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionCard: 'nil',
      authToken: props.authToken,
      userId: jwtDecode(props.authToken).userId,
      userName: jwtDecode(props.authToken).userName,
      balance: null,
    };
  }

  componentDidMount() {
    axios('/balance', {
      headers:
    { Authorization: this.state.authToken },
    }).then((result) => {
      this.setState({ balance: result.data.balance });
    });
  }

  addContact = () => {
    this.setState({ actionCard: 'AddContact' });
  }
  renderActionCard = () => {
    switch (this.state.actionCard) {
      case 'nil': return (<div />);
      // case 'send' return (<Send />);
      case 'AddContact': return (<AddContact />);
      default: return (<div />);
    }
  }

  render = () => (
    <div className="Home">
      {/* <NavigationPane /> */}
      <div className="Home-navigation-pane-temp"><NavigationBar addContact={this.addContact} /></div>
      <div className="Home-main-app-area">
        <div className="Home-main-app-area-header">
          {/* <StatusBar /> */}
          {/* <UserInfo /> */}
          <div className="Home-status-bar-temp"><StatusBar /></div>
          <div className="Home-user-info-temp"><UserInfo /></div>
        </div>
        <div className="Home-main-app-area-body">
          {this.renderActionCard()}
          <div>testing home {this.state.userId} {this.state.userName} {this.state.balance}</div>
        </div>
      </div>
    </div>
  )
}


export default Home;