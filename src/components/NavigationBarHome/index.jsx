import React from 'react';
import './NavigationBarHome.css';

const Home = ({ home }) => (
  <div>
    <button className="Home-button" onClick={home} >
        My Wallet
    </button>
  </div>
);

export default Home;
