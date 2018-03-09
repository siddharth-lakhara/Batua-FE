import React from 'react';
import RecentTransactions from './transactions/transactions';
import BottomPane from './bottom/bottom';
import './contentCard.css';

const ContentPane = () => (
  <div className="contentCard-main">
    <RecentTransactions />
    <BottomPane />
  </div>
);

export default ContentPane;
