import React, { Component } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';

import Login from '../Login';
import Register from '../Register';
import Home from '../Home';

import Payment from '../Payment';
// import Login from '../Login';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'login',
      authToken: null,
    };
  }

  loginOnClick = (userName, password) => {
    axios.post('/users/login', { userName, password })
      .then((result) => {
        const authToken = result.data.data.id_token;
        this.setState({
          page: 'home',
          authToken,
        });
      });
  }

  renderPage = () => {
    switch (this.state.page) {
      case 'login': return (
        <Login
          className="App-login-page"
          onClick={(userName, password) => { this.loginOnClick(userName, password); }}
        />
      );
      case 'register': return (
        <Register
          className="App-register-page"
          onClick={() => {}}
        />
      );
      case 'home': return (
        <Home
          className="App-home-page"
          authToken={this.state.authToken}
        />
      );
      default: return (
        <Home
          className="App-home-page"
          authToken={this.state.authToken}
        />
      );
    }
  }

  render = () => (
    <div className="App">
      {this.renderPage()}
    </div>
  )
}


export default App;
