import React from 'react';
import Logo from './sidebar/logo/logo';
import Home from './sidebar/home/home';
import Head from './sidebar/sidebarHeader';
import Content from './sidebar/sidebarContents';
import './sidebar.css';

const Sidebar = ({
  send, request, transaction, home, balance,
}) => (
  <div className="sidebar-main">
    <div className="sidebar-box">
      <Logo />
      <Home home={balance => home(balance)} />
      <div className="Sidebar-options">
        <div className="sidebar-transactions">
          <Head
            title="Transactions"
          />
          <div>
            <Content item="All Transactions" click={transaction} />
            <Content item="Send" click={send} />
            <Content item="Request" click={request} />
          </div>
        </div>

        <div className="sidebar-contacts">
          <Head
            title="Contacts"
          />
          <div>
            <div className="Sidebar-add-contact">
              <i style={{ color: 'white', fontSize: '20px', alignSelf: 'center' }} class="material-icons">control_point</i>
              <Content item="Add Contact" />
            </div>
            <Content item="Groups" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Sidebar;

