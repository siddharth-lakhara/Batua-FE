import React, { Component } from 'react';
import Login from '../login/Login';
import Register from '../register/Register';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      authToken: '',
      currentState: 0,
    };
  }

  render() {
    if (this.state.currentState) {
      return (
        <div>
        Login page will be displayed here
        Token: {this.state.authToken}
        </div>
      );
    }

    if (this.state.page === 0) {
      return (
        <div className="App">
          <Login
            changeToRegister={() => this.setState({ page: 1 })}
            authToken={this.state.authToken}
            changePage={(token) => { this.setState({ currentState: 1, authToken: token }); }}
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
