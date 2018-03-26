import React from 'react';
import './NavigationBarHeader.css';

const SidebarHeader = props => (
  <div className="sidebar-Header">
    {props.title}
  </div>
);

export default SidebarHeader;
