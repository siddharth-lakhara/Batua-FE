import React from 'react';
import Logo from './sidebar/logo/logo';
import Home from './sidebar/home/home';
import Transactions from './sidebar/transactions/transactions';
// import Accounts from './sidebar/accounts/accounts';
import Contact from './sidebar/contacts/contacts';
import './sidebar.css';

const Sidebar = () => (
  <div className="sidebar-main">
    <Logo />
    <Home />
    <Transactions />
    {/* <Accounts /> */}
    <Contact />
  </div>
);

export default Sidebar;

