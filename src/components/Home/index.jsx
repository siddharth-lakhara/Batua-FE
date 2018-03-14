import React, { Component } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

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

  renderActionCard = () => {
    switch (this.state.actionCard) {
      case 'nil': return (<div />);
      // case 'send' return (<Send />);
      default: return (<div />);
    }
  }

  render = () => (
    <div className="Home">
      {/* <NavigationPane /> */}
      <div className="Home-navigation-pane-temp">this is the navigation pane(temp)</div>
      <div className="Home-main-app-area">
        <div className="Home-main-app-area-header">
          {/* <StatusBar /> */}
          {/* <UserInfo /> */}
          <div className="Home-status-bar-temp">this is the status bar(temp)</div>
          <div className="Home-user-info-temp">this is the user info(temp)</div>
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
