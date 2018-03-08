import React from 'react';
import RecentTransactions from './transactions/transactions';
import BottomPane from './bottom/bottom';

const ContentPane = () => (
  <div className="rightPane-body">
    <RecentTransactions />
    <BottomPane />
  </div>
);

export default ContentPane;
