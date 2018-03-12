import React from 'react';
import Header from './rightPane/header/header';
import UserInfo from './rightPane/userinfo/userinfo';
import ContentCard from './rightPane/contentCard';
import './rightPane.css';

const RightPane = props => (
  <div className="rightPane-main">
    <div className="rightPane-headerPane">
      <Header />
    </div>
    <div className="rightPane-UserInfo">
      <UserInfo />
    </div>
    <div className="rightPane-body">
      <ContentCard
        userName={props.userName}
        authToken={props.idToken}
      />
    </div>
  </div>
);

export default RightPane;

