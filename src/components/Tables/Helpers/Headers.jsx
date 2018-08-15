import React from 'react';
import './Headers.css';

const Headers = (props) => {
  const { head, specialProp } = props;
  const AllHeadColumns = head.map((e, index) => (
    <th className="Table-header" key={index}>
      {e}
    </th>
  ));

    // Added to handle transactionStatus Table
  if (specialProp) {
    AllHeadColumns.push(<th className="Table-header" key="special">Take Actions</th>);
  }

  return (
    <tr>
      {AllHeadColumns}
    </tr>
  );
};

export default Headers;
