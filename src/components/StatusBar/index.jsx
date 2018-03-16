import React from 'react';
import './StatusBar.css';

const Header = props => (
  <div className="Header-main">
    <div className="Header-titleText">
        My Wallet
    </div>
    <div className="Header-userinfoPane">
      <div className="Header-infoItems">
        <i className="material-icons">notifications</i>
      </div>
      {/* <div className="Header-infoItems">
        User photo
      </div> */}
      <div className="Header-infoItems">
        {props.userName}
      </div>
      {/* <div className="Header-infoItems">
        Arrow
      </div> */}
    </div >

  </div>
);

export default Header;
