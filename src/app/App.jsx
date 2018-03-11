import React, { Component } from 'react';
import Login from '../login/Login';
import Register from '../register/Register';
import Sidebar from '../loggedIn/sidebar';
import RightPane from '../loggedIn/rightPane';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      authToken: '',
      currentState: 0,
      userName: '',
    };
  }

  render() {
    if (this.state.currentState) {
      return (
        <div className="app-main">
          <Sidebar
            userName={this.state.userName}
            authToken={this.state.authToken}
          />
          <RightPane
            userName={this.state.userName}
            authToken={this.state.authToken}
          />
        </div>
        // <div>
        // Login page will be displayed here
        // Token: {this.state.authToken}
        // </div>
      );
    }

    if (this.state.page === 0) {
      return (
        <div className="App">
          <Login
            changeToRegister={() => this.setState({ page: 1 })}
            authToken={this.state.authToken}
            changePage={(token, userName) => { this.setState({ currentState: 1, authToken: token, userName }); }}
          />
        </div>
      );
    }

    return (
      <div className="App">
        <Register changeToRegister={() => this.setState({ page: 0 })} />
      </div>
    );
  }
}

export default App;
