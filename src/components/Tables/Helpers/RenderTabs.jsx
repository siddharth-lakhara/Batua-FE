import React from 'react';
import './RenderTabs.css';

const RenderTabs = (props) => {
  const { title, tabs, tabState } = props;
  const TabComponent = tabs.map((e, index) => (
    <span
      className="tableTabs-items"
      onClick={() => { props.changeTab(e); }}
      key={index}
      style={{ background: e === tabState ? '#05e0fa' : 'white' }}
    >
      {e}
    </span>
  ));

  return (
    <div className="tableTabs-main">
      <span>{title}</span>
      <span className="tableTabs-tabs">{TabComponent}</span>
    </div>
  );
};

export default RenderTabs;
