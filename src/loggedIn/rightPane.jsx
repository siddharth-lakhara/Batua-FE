import React from 'react';
import Header from './rightPane/header/header';
import UserInfo from './rightPane/userinfo/userinfo';
import RecentTransactions from './rightPane/transactions/transactions';
import BottomPane from './rightPane/bottom/bottom';
import './rightPane.css';

const rightPane = () => (
  <div className="rightPane-main">
    <div className="rightPane-headerPane">
      <Header />
    </div>
    <div className="rightPane-body">
      <UserInfo />
      <RecentTransactions />
      <BottomPane />
    </div>
  </div>
);

export default rightPane;

