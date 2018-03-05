import React, { Component } from 'react';
import Sidebar from './loggedIn/sidebar';
import RightPane from './loggedIn/rightPane';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: 1,
    };
  }

  render() {
    if (this.state.currentState) { // when user is loggid in
      return (
        <div className="app-main">
          <Sidebar />
          <RightPane />
        </div>
      );
    }

    return ( // show login page
      <div className="App">
        <p>Login page will be displayed here</p>
      </div>
    );
  }
}

export default App;
