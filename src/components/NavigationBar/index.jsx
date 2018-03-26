import React from 'react';
import Logo from '../NavigationBarLogo';
import Home from '../NavigationBarHome';
import Head from '../NavigationBarHeader';
import Content from '../NavigationBarContents';
import './NavigationBar.css';

const Sidebar = ({
  send, request, transaction, home, balance, addContact, allContacts, split,
}) => (
  <div className="sidebar-main">
    <div className="sidebar-box">
      <Logo />
      <Home home={() => home()} />
      <div className="Sidebar-options">
        <div className="sidebar-transactions">
          <Head
            title="Transactions"
          />
          <div>
            <Content item="All Transactions" click={() => transaction()} />
            <Content item="Send" click={() => send()} />
            <Content item="Request" click={() => request()} />
            <Content item="Split" click={() => split()} />
          </div>
        </div>

        <div className="sidebar-contacts">
          <Head
            title="Contacts"
          />
          <div>
            <div className="Sidebar-add-contact">
              <i style={{ color: 'white', fontSize: '20px', alignSelf: 'center' }} className="material-icons">control_point</i>
              <Content item="Add Contact" click={addContact} />
            </div>
            <Content item="All contacts" click={allContacts} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Sidebar;
