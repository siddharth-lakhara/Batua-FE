import React, { Component } from 'react';
import Sidebar from './loggedIn/sidebar';
import RightPane from './loggedIn/rightPane';
import SendPage from './components/SendPage';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: 'send',
    };
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
        <SendPage />
      </div>
    );
  }
}

export default App;
