import React, { Component } from 'react';
import Pusher from 'pusher-js';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

// import Login from '../components/Login';

import './App.css';

const Home = () => <div>To be removed</div>;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'login',
    };
  }

  render = () => {
    let Child;

    switch (this.state.page) {
      // case 'login': Child = Login; break;
      default: Child = Home; break;
    }

    return (
      <div className="App">
        <Child className="App-container" />
      </div>
    );
  }
}


export default App;
