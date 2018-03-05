import React from 'react';
import Logo from './logo/logo';
import Home from './home/home';
import Transactions from './transactions/transactions';
import Accounts from './accounts/accounts';
import Contact from './contacts/contacts';
import './sidebar.css';

const Sidebar = () => (
  <div className="sidebar-main">
    <Logo />
    <Home />
    <Transactions />
    <Accounts />
    <Contact />
  </div>
);

export default Sidebar;

