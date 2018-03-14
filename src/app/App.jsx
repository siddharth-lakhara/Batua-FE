import React, { Component } from 'react';
import Pusher from 'pusher-js';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Login from '../login/Login';
import Register from '../register/Register';
import SendPage from '../components/SendPage';
import RequestPage from '../components/RequestPage';
import AddContact from '../components/AddContact';
import Sidebar from '../loggedIn/sidebar';
import RightPane from '../loggedIn/rightPane';
import TransactionPage from '../components/TransactionPage';
import ContentCard from '../loggedIn/rightPane/contentCard';
import AllContacts from '../components/AllContacts';
import '../loggedIn/rightPane/contentCard.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'login',
      idToken: '',
      userId: 0,
      balance: 0,
      userName: '',
    };
  }

  componentDidMount() {
    this.pusher = new Pusher('cc03634ec726b20a38bf', {
      cluster: 'ap2',
      encrypted: true,
    });
    this.channel = this.pusher.subscribe('money-channel');
  }

  decode = idToken => jwtDecode(idToken).userId;

  login = (userName, password) => {
    axios.post('/users/login', { userName, password })
      .then((result) => {
        const idToken = result.data.data.id_token;
        this.setState({
          page: 'home', idToken, userId: this.decode(idToken), userName,
        });
      })
      .then(() => {
        const { userId, idToken } = this.state;
        axios('/balance', {
          headers:
        { Authorization: idToken },
        }).then((result) => {
          this.setState({ balance: result.data.balance });
        });
        this.channel.bind('request-money', (data) => {
          if (userId === data.from) {
            axios.post(
              '/userName',
              { friendId: data.to }, { headers: { Authorization: idToken } },
            ).then((result) => {
              const { userName: friendName } = result.data;
              const isAccepted = global.confirm(`${friendName} has requested ${data.amount}
              \nReason: ${data.reason ? data.reason : 'not given'}.
              \nAccept?`);
              if (isAccepted) {
                this.setState({ page: 'transactions' });
              }
            });
          }
        });

        this.channel.bind('send-money', (data) => {
          if (userId === data.to) {
            axios.post(
              '/userName',
              { friendId: data.from }, { headers: { Authorization: idToken } },
            ).then((result) => {
              const { userName: friendName } = result.data;
              global.alert(`${friendName} has sent ${data.amount}
              \nReason: ${data.reason ? data.reason : 'not given'}.`);
              this.transactions();
            });
          }
        });
      }).catch(err => console.log(err));
  }

  send = () => {
    this.setState({ page: 'send' });
  }

  request = () => {
    this.setState({ page: 'request' });
  }

  transactions = () => {
    this.setState({ page: 'transactions' });
  }

  home = (balance) => {
    this.setState({ page: 'home', balance });
  }

  addContact = () => {
    this.setState({ page: 'addContact' });
  }

  allContacts = () => {
    this.setState({ page: 'allContacts' });
  }

  goHome = () => { this.setState({ page: 'home' }); }

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
            <Sidebar
              send={() => this.send()}
              request={() => this.request()}
              transaction={() => this.transactions()}
              home={() => this.goHome()}
              addContact={() => this.addContact()}
            />
            <SendPage
              home={balance => this.home(balance)}
              token={this.state.idToken}
              userId={this.state.userId}
              balance={this.state.balance}
              userName={this.state.userName}
            />
          </div>
        );
      }
      case ('request'): {
        return ( // show login page
          <div className="App">
            <Sidebar
              send={() => this.send()}
              request={() => this.request()}
              transaction={() => this.transactions()}
              home={() => this.goHome()}
              addContact={() => this.addContact()}
              allContacts={() => this.allContacts()}
            />
            <RequestPage
              home={balance => this.home(balance)}
              token={this.state.idToken}
              userId={this.state.userId}
              balance={this.state.balance}
            />
          </div>
        );
      }
      case ('transactions'): {
        return ( // show login page
          <div className="App">
            <Sidebar
              send={() => this.send()}
              request={() => this.request()}
              transaction={() => this.transactions()}
              home={() => this.goHome()}
              addContact={() => this.addContact()}
              allContacts={() => this.allContacts()}
            />
            <TransactionPage
              token={this.state.idToken}
              userId={this.state.userId}
              userName={this.state.userName}
            />
          </div>
        );
      }
      case ('addContact'): {
        return ( // show login page
          <div className="App">
            <Sidebar
              send={() => this.send()}
              request={() => this.request()}
              transaction={() => this.transactions()}
              home={() => this.goHome()}
              addContact={() => this.addContact()}
              allContacts={() => this.allContacts()}
            />
            {/* <div className="App-addContact-Rightpan"> */}
            <AddContact
              home={balance => this.home(balance)}
              token={this.state.idToken}
              userId={this.state.userId}
              balance={this.state.balance}
            />
            {/* <div className="rightPane-body">
                <ContentCard
                  userName={this.state.userName}
                  authToken={this.state.idToken}
                />
              </div> */}
            {/* </div> */}
          </div>
        );
      }
      case ('allContacts'): {
        return ( // show login page
          <div className="App">
            <Sidebar
              send={() => this.send()}
              request={() => this.request()}
              transaction={() => this.transactions()}
              home={() => this.goHome()}
              addContact={() => this.addContact()}
              allContacts={() => this.allContacts()}
            />
            <AllContacts
              home={balance => this.home(balance)}
              token={this.state.idToken}
              userId={this.state.userId}
              balance={this.state.balance}
              userName={this.state.userName}
            />
          </div>
        );
      }
      default: {
        return (
          <div className="App">
            <Sidebar
              send={() => this.send()}
              request={() => this.request()}
              transaction={() => this.transactions()}
              home={() => this.goHome()}
              addContact={() => this.addContact()}
              allContacts={() => this.allContacts()}
            />
            <RightPane
              send={() => this.send()}
              request={() => this.request()}
              userName={this.state.userName}
              idToken={this.state.idToken}
              balance={this.state.balance}
            />
          </div>
        );
      }
    }
  }
}


export default App;
