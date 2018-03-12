import React from 'react';
import RecentTransactions from './transactions/transactions';
import BottomPane from './bottom/bottom';
import './contentCard.css';

const ContentPane = props => (
  <div className="contentCard-main">
    <RecentTransactions
      userName={props.userName}
      authToken={props.authToken}
    />
    {/* <BottomPane /> */}
  </div>
);

export default ContentPane;
