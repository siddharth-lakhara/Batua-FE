import React from 'react';
import './sidebarContents.css';

const Contents = props => (
  <div >
    <button className="sidebar-Contents">
      {props.item}
    </button>
  </div>
);

export default Contents;

