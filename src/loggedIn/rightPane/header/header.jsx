import React from 'react';
import './header.css';

const Header = () => (
  <div className="Header-main">
    <div className="Header-titleText">
        My Wallet
    </div>
    <div className="Header-userinfoPane">
      <div className="Header-infoItems">
        <i class="material-icons">notifications</i>
      </div>
      <div className="Header-infoItems">
        User photo
      </div>
      <div className="Header-infoItems">
        User Name
      </div>
      {/* <div className="Header-infoItems">
        Arrow
      </div> */}
    </div >

  </div>
);

export default Header;

