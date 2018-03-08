import React, { Component } from 'react';
import Login from '../login/Login';
import Register from '../register/Register';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Register />
      </div>
    );
  }
}

export default App;
