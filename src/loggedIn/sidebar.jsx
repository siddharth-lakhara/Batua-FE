import React from 'react';
import Logo from './sidebar/logo/logo';
import Home from './sidebar/home/home';
import Head from './sidebar/sidebarHeader';
import Content from './sidebar/sidebarContents';
import './sidebar.css';

const Sidebar = () => (
  <div className="sidebar-main">
    <div className="sidebar-box">
      <Logo />
      <Home />
      <div className="Sidebar-options">
        <div className="sidebar-transactions">
          <Head
            title="Transactions"
          />
          <div>
            <Content item="All Transactions" />
            <Content item="Send" />
            <Content item="Recieve" />
          </div>
        </div>

        <div className="sidebar-contacts">
          <Head
            title="Contacts"
          />
          <div>
            <Content item="All Contacts" />
            <Content item="Groups" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Sidebar;

