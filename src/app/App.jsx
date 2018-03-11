import React, { Component } from 'react';
import Pusher from 'pusher-js';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Login from '../login/Login';
import Register from '../register/Register';
import SendPage from '../components/SendPage';
import Sidebar from '../loggedIn/sidebar';
import RightPane from '../loggedIn/rightPane';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'login',
      id_token: '',
      userId: 0,
    };
  }

  decode = (id_token) => jwtDecode(id_token).userId;

  login = (userName, password) => {
    axios.post('/users/login', { userName, password })
    .then((result) => {
      const id_token = result.data.data.id_token;
      this.setState({page: 'send', id_token, userId: this.decode(id_token)});
    })
    .catch(err => console.log(err)); 
   }

  render() {
    switch (this.state.page) {
      case ('login'): {
        return (
          <div className="App">
            <Login
              press={this.login}
              changeToRegister={() => this.setState({ page: 'register' })}
            />
          </div>
        );
      }
      case ('register'): {
        return (
          <div className="App">
            <Register
              changeToRegister={() => this.setState({ page: 'login' })}
            />
          </div>
        );
      }
      case ('send'): {
        return ( // show login page
          <div className="App">
            <Sidebar />
            <SendPage token={this.state.id_token} userId={this.state.userId} />
          </div>
        );
      }
      default: {
        return (
          <div className="App">
            <Sidebar />
            <RightPane />
          </div>
        );
      }
    }
  }
}


export default App;
