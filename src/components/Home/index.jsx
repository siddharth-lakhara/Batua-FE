import React, { Component } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Modal from 'react-modal';

import NavigationBar from '../NavigationBar';
import StatusBar from '../StatusBar';
import UserInfo from '../UserInfo';
import AddContact from '../AddContact';
import AllContacts from '../AllContacts';
import Payment from '../Payment';

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionId: null,
      modalType: null,
      modalIsOpen: false,
      actionCard: 'home',
      authToken: props.authToken,
      userId: jwtDecode(props.authToken).userId,
      userName: jwtDecode(props.authToken).userName,
      balance: null,
      friendName: null,
      paymentAmount: 0,
      paymentReason: null,
    };
  }


  componentDidMount() {
    this.balance();
    this.pusher = new Pusher('cc03634ec726b20a38bf', {
      cluster: 'ap2',
      encrypted: true,
    });
    this.channel = this.pusher.subscribe('money-channel');

    this.channel.bind('send-money', (data) => {
      if (this.state.userId === data.to) {
        axios.post(
          '/userName',
          { friendId: data.from }, { headers: { Authorization: this.props.authToken } },
        ).then((result) => {
          const { userName: friendName } = result.data;
          this.setState({
            modalType: 'sent',
            friendName,
            paymentAmount: data.amount,
            paymentReason: data.reason,
          });
          this.openModal();
          this.setState({ balance: this.state.balance + data.amount });
        });
      }
    });

    this.channel.bind('approve-money', (data) => {
      if (data.from === this.state.userId) {
        axios.post(
          '/userName',
          { friendId: data.to }, { headers: { Authorization: this.props.authToken } },
        ).then((result) => {
          const { userName: friendName } = result.data;
          this.setState({
            modalType: data.status,
            friendName,
            paymentAmount: data.amount,
            paymentReason: data.reason,
          });
          this.openModal();
          this.balance();
        });
      }
    });

    this.channel.bind('request-money', (data) => {
      if (this.state.userId === data.from) {
        axios.post(
          '/userName',
          { friendId: data.to }, {
            headers:
            { Authorization: this.state.authToken },
          },
        ).then((result) => {
          const { userName: friendName } = result.data;
          this.setState({
            modalType: 'requested',
            transactionId: data.id,
            friendName,
            paymentAmount: data.amount,
            paymentReason: data.reason,
          });
          this.openModal();
        });
      }
    });
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal = () => {
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  balance = () => {
    axios('/balance', {
      headers:
    { Authorization: this.state.authToken },
    }).then((result) => {
      this.setState({ balance: result.data.balance });
    });
  }
  send = () => this.setState({ actionCard: 'Send' });
  request = () => this.setState({ actionCard: 'Request' });
  home = () => this.setState({ actionCard: 'home' });

  addContact = () => {
    this.setState({ actionCard: 'AddContact' });
  }
  allContacts = () => {
    this.setState({ actionCard: 'AllContacts' });
  }

  updateBalance = (balance) => {
    this.setState({ balance });
    this.forceUpdate();
  }

  approve = (transactionId, decision) => {
    console.log('APPROVED');
    axios.patch(
      '/transaction/approve',
      {
        transactionId,
        decision,
      },
      { headers: { Authorization: this.props.authToken } },
    ).then(() => {
      this.balance();
      this.closeModal();
    });
  };

  customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  renderActionCard = () => {
    switch (this.state.actionCard) {
      case 'home': return (<div />);
      // case 'send' return (<Send />);
      case 'AddContact': return (<AddContact />);
      case 'AllContacts': return (<AllContacts
        token={this.state.authToken}
        userName={this.state.userName}
      />);
      case 'Send': return (<Payment
        token={this.state.authToken}
        type="send"
        balance={this.state.balance}
        updateBalance={bal => this.updateBalance(bal)}
      />);
      case 'Request': return (<Payment
        token={this.state.authToken}
        type="request"
        balance={this.state.balance}
        updateBalance={bal => this.updateBalance(bal)}
      />);
      default: return (<div />);
    }
  }


  render = () => (
    <div className="Home">
      <div className="Home-Modal">
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={this.customStyles}
        >
          <div>
            <button onClick={this.closeModal}>x</button>
            <div>{this.state.friendName} has {this.state.modalType} {this.state.paymentAmount}</div>
            <div>with reason: {this.state.paymentReason}</div>
            {
              (this.state.modalType === 'requested') ?
                <div>
                  <button onClick={() => this.approve(this.state.transactionId, 'YES')}>
                  Accept
                  </button>
                  <button onClick={() => this.approve(this.state.transactionId, 'NO')}>
                  Reject
                  </button>
                </div>
            : null
            }
          </div>
        </Modal>
      </div>
      {/* <NavigationPane /> */}
      <div className="Home-navigation-pane-temp">
        <NavigationBar
          addContact={this.addContact}
          allContacts={this.allContacts}
          send={this.send}
          home={this.home}
          request={this.request}
        />
      </div>
      <div className="Home-main-app-area">
        <div className="Home-main-app-area-header">
          {/* <StatusBar /> */}
          {/* <UserInfo /> */}
          <div className="Home-status-bar-temp"><StatusBar userName={this.state.userName} /></div>
          <div className="Home-user-info-temp"><UserInfo userName={this.state.userName} balance={this.state.balance} send={this.send} request={this.request} /></div>
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
