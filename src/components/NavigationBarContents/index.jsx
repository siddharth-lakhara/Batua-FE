import React from 'react';
import './NavigationBarContents.css';

const Contents = ({ click, item }) => (
  <div >
    <button className="sidebar-Contents" onClick={click}>
      {item}
    </button>
  </div>
);

export default Contents;
