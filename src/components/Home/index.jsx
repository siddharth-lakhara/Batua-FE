import React, { Component } from 'react';
import Pusher from 'pusher-js';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
// import Modal from 'react-modal';

import NavigationBar from '../NavigationBar';
import StatusBar from '../StatusBar';
import UserInfo from '../UserInfo';
import AddContact from '../AddContact';
import AllContacts from '../AllContacts';
import Payment from '../Payment';
// import Notification from '../Notification';
import Tables from '../Tables';
import Split from '../Split';

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactionId: null,
      // modalType: null,
      actionCard: 'home',
      userId: jwtDecode(props.authToken).userId,
      userName: jwtDecode(props.authToken).userName,
      balance: null,
      contactId: 0,
      transactions: [],
      notifications: [],
    };
  }


  componentDidMount() {
    axios.get('/transactions/unseen', { headers: { Authorization: this.props.authToken } }).then((result) => {
      const { data } = result;
      const promises = data.map(tr =>
        axios.post(
          '/userName',
          { friendId: tr.name }, {
            headers:
            { Authorization: this.props.authToken },
          },
        ));
      Promise.all(promises).then((namesArr) => {
        const res = data.map((trans, index) => ({
          ...trans,
          name: namesArr[index].data.userName,
        }));
        this.setState({
          notifications: res,
        });
      });
    });
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
            notifications: this.state.notifications.concat({
              transactionId: data.id,
              type: 'sent',
              name: friendName,
              amount: data.amount,
              reason: data.reason,
            }),
          });
          this.setState({ balance: this.state.balance + data.amount });
          this.balance();
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
            notifications: this.state.notifications.concat({
              transactionId: data.id,
              type: data.status,
              name: friendName,
              amount: data.amount,
              reason: data.reason,
            }),
          });
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
            { Authorization: this.props.authToken },
          },
        ).then((result) => {
          const { userName: friendName } = result.data;
          this.setState({
            notifications: this.state.notifications.concat({
              transactionId: data.id,
              type: 'requested',
              name: friendName,
              amount: data.amount,
              reason: data.reason,
            }),
          });
        });
        this.balance();
      }
    });
  }

  onSplit = (amount, reason) => {
    this.setState({ actionCard: 'splitOptions', amount, reason });
  }

  balance = () => {
    axios('/transactions/history', { headers: { Authorization: this.props.authToken } })
      .then((result) => {
        console.log(result.data);
        this.setState({ transactions: result.data.history });
      })
      .catch(err => console.log(err));

    axios('/transactions/history/splitable', { headers: { Authorization: this.props.authToken } })
      .then((result) => {
        this.setState({ transactionsSplitable: result.data.history });
        console.log(result.data);
      })
      .catch(err => console.log(err));

    axios('/balance', {
      headers:
    { Authorization: this.props.authToken },
    }).then((result) => {
      this.setState({ balance: result.data.balance });
    });
  }

  home = () => this.setState({ actionCard: 'home' });
  split = () => this.setState({ actionCard: 'split' });
  transaction = () => this.setState({ actionCard: 'Transactions' })

  addContact = () => {
    this.setState({ actionCard: 'AddContact' });
  }
  allContacts = () => {
    this.setState({ actionCard: 'AllContacts' });
  }

  removeNotifications = () => {
    this.setState({
      notifications: [],
    });
  }
  updateBalance = (balance) => {
    this.setState({ balance });
    this.forceUpdate();
  }

  approve = (transactionId, decision) => {
    axios.patch(
      '/transaction/approve',
      {
        transactionId,
        decision,
      },
      { headers: { Authorization: this.props.authToken } },
    ).then(() => {
      this.balance();
    });
  };

  sendContact = id => this.setState({ actionCard: 'Send', contactId: id });
  requestContact = id => this.setState({ actionCard: 'Request', contactId: id });

  customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '20vw',
    },
  };

  renderActionCard = () => {
    switch (this.state.actionCard) {
      case 'home': return (<Tables
        authToken={this.props.authToken}
        transactionsUpdate={() => this.balance()}
        tableType="transactionType"
        dataAll={this.state.transactions.slice(0, 5)}
        title="Recent Transactions"
        currentUser={this.state.userName}
        currentTab="All"
        approve={this.approve}
        className="Home-white-bg"
      />);
      // case 'send' return (<Send />);
      case 'AddContact': return (
        <div>
          <AddContact token={this.props.authToken} />
          <Tables
            approve={this.approve}
            transactionsUpdate={() => this.balance()}
            authToken={this.props.authToken}
            crop="no-crop"
            tableType="transactionType"
            dataAll={this.state.transactions.slice(0, 5)}
            currentUser={this.state.userName}
            currentTab="All"
            className="Home-white-bg"
          />
        </div>);
      case 'AllContacts': return (<AllContacts
        token={this.props.authToken}
        userName={this.state.userName}
        send={id => this.sendContact(id)}
        request={id => this.requestContact(id)}
      />);
      case 'Transactions':
        return (<Tables
          approve={this.approve}
          authToken={this.props.authToken}
          crop="no-crop"
          tableType="transactionType"
          transactionsUpdate={() => this.balance()}
          dataAll={this.state.transactions}
          currentUser={this.state.userName}
          currentTab="All"
        />);
      case 'Send': return (
        <div><Payment
          token={this.props.authToken}
          type="send"
          contactId={this.state.contactId}
          balance={this.state.balance}
          transactionsUpdate={() => this.balance()}
          updateBalance={bal => this.updateBalance(bal)}
        />
          <Tables
            approve={this.approve}
            authToken={this.props.authToken}
            crop="no-crop"
            tableType="transactionType"
            transactionsUpdate={() => this.balance()}
            dataAll={this.state.transactions.slice(0, 5)}
            currentUser={this.state.userName}
            currentTab="All"
            className="Home-white-bg"
          />
        </div>);
      case 'Request': return (
        <div><Payment
          token={this.props.authToken}
          contactId={this.state.contactId}
          type="request"
          balance={this.state.balance}
          transactionsUpdate={() => this.balance()}
          updateBalance={bal => this.updateBalance(bal)}
        />
          <Tables
            approve={this.approve}
            authToken={this.props.authToken}
            crop="no-crop"
            tableType="transactionType"
            transactionsUpdate={() => this.balance()}
            dataAll={this.state.transactions.slice(0, 5)}
            currentUser={this.state.userName}
            currentTab="All"
            className="Home-white-bg"
          />
        </div>);
      case 'split':
        return (
          <div className="Home-split">
            <Tables
              approve={this.approve}
              crop="no-crop"
              tableType="split"
              transactionsUpdate={() => this.balance()}
              dataAll={this.state.transactionsSplitable}
              currentUser={this.state.userName}
              currentTab="Send"
              onSplit={this.onSplit}
            />
          </div>);
      case 'splitOptions':
        return (
          <div className="Home-split"><Split
            token={this.props.authToken}
            contactId={[]}
            type="split"
            balance={this.state.balance}
            updateBalance={bal => this.updateBalance(bal)}
            amount={this.state.amount}
            reason={this.state.reason}
          /> <Tables
            approve={this.approve}
            authToken={this.props.authToken}
            crop="no-crop"
            tableType="transactionType"
            transactionsUpdate={() => this.balance()}
            dataAll={this.state.transactions.slice(0, 5)}
            currentUser={this.state.userName}
            currentTab="All"
            className="Home-white-bg"
          />
          </div>);
      case 'nil': return (
        <div />
      );
      default: return (<div />);
    }
  }


  render = () => (
    <div className="Home">
      {/* <div className="Home-Notification">
        <Notification
          isOpen={this.state.modalIsOpen}
          modalType={this.state.modalType}
          friendName={this.state.friendName}
          transactionId={this.state.transactionId}
          paymentAmount={this.state.paymentAmount}
          paymentReason={this.state.paymentReason}
          approve={this.approve}
          openModal={this.openModal}
          afterOpenModal={this.afterOpenModal}
          closeModal={this.closeModal}
          customStyles={this.customStyles}
        />
      </div> */}
      {/* <NavigationPane /> */}
      <div className="Home-navigation-pane-temp">
        <NavigationBar
          addContact={this.addContact}
          allContacts={this.allContacts}
          send={() => this.sendContact(0)}
          home={this.home}
          request={() => this.requestContact(0)}
          split={this.split}
          transaction={this.transaction}
        />
      </div>
      <div className="Home-main-app-area">
        <div className="Home-main-app-area-header">
          {/* <StatusBar /> */}
          {/* <UserInfo /> */}
          <div className="Home-status-bar-temp"><StatusBar
            userName={this.state.userName}
            authToken={this.props.authToken}
            removeNotifications={() => this.removeNotifications()}
            notifications={this.state.notifications}
            approve={this.approve}
          />
          </div>
          <div className="Home-user-info-temp"><UserInfo userName={this.state.userName} balance={this.state.balance} send={() => this.sendContact(0)} request={() => this.requestContact(0)} /></div>
        </div>
        <div className="Home-main-app-area-body">
          {this.renderActionCard()}
        </div>
      </div>
    </div>
  )
}


export default Home;
