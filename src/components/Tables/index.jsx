import React from 'react';
import './index.css';

// Tables
// ============

// tableType: [transactionStatus, transactionType, contacts];

// transactionStatus: Displays table based on transaction status, i.e. pending, completed, rejected;
//                    This type will expect a props specific to this case -> actions
// transactionType: Displays table based on transaction type, i.e. all, send, receive;
// contacts: The table which will display all transactions with particular user.
//           This type will expect a props specific to this case -> currentContact

// Expected Props:
// -----------------
// tableType: The type of table to be displayed;
// dataAll: Contains all the data to be displayed. This will be filtered according to tab;
// currentTab: The default tab to be displayed;
// currentUser: Name of current User and "not id";

// tabs:
//     type- transactionType => ['All', 'Send', 'Received']
//     type- transactionStatus => ['Completed', 'Pending', 'Received']
//     type- contacts => none required

const RenderTabs = (props) => {
  const { title, tabs } = props;
  const TabComponent = tabs.map((e, index) => (
    <span className="table-tabs-items-components" onClick={() => { props.changeTab(e); }} key={index}>
      {e}
    </span>
  ));

  return (
    <div className="table-tabs-main">
      <span>{title}</span>
      <span className="table-tabs-tabs">{TabComponent}</span>
    </div>
  );
};

const Headers = (props) => {
  const { head } = props;
  const AllHeadColumns = head.map((e, index) => (<th key={index}>{e}</th>));

  return (
    <tr className="Table-header">
      {AllHeadColumns}
    </tr>
  );
};

const RenderTable = (props) => {
  const { head, data } = props;
  console.log(head, data);
  //   const newData = restructuredData(head, data);
  const rows = Object.keys(data).map((rowIndex) => {
    const row = Object.keys(data[rowIndex]).map(rowElemIndex => (
      <td>{data[rowIndex][rowElemIndex]}</td>
    ));
    return (<tr>{row}</tr>);
  });
  return rows;
};

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabState: props.currentTab,
    };
  }

  changeTab = (newTab) => {
    this.setState({ tabState: newTab });
  }

  render() {
    if (this.props.tableType === 'transactionType') {
      const tabs = ['All', 'Send', 'Received'];

      let headAll;
      if (this.state.tabState === 'All') {
        headAll = ['Sent To', 'Sent By', 'Amount', 'Status', 'Transaction Id', 'Category', 'Reason'];
      } else if (this.state.tabState === 'Send') {
        headAll = ['Sent To', 'Amount', 'Status', 'Transaction Id', 'Category', 'Reason'];
      } else {
        headAll = ['Sent By', 'Amount', 'Status', 'Transaction Id', 'Category', 'Reason'];
      }
      const headers = <Headers head={headAll} />;

      const data = <RenderTable head={headAll} data={this.props.dataAll} />;

      return (
        <div className="tables-div">
          <RenderTabs title="All Transactions" tabs={tabs} changeTab={this.changeTab} />
          {/* <RenderTable headers={headers} data={data} /> */}
          <table className="tables-main">
            <thead>
              {headers}
            </thead>
            <tbody>
              {data}
            </tbody>
            {/* {<Headers head={headAll} tab={this.props.currentTab} />} */}
          </table>
        </div>
      );
    } else if (this.props.tableType === 'transactionStatus') {
      const tabs = ['Completed', 'Pending', 'Rejected'];

      let headAll;
      if (this.state.tabState === 'Completed') {
        headAll = ['Sent To', 'Sent By', 'Amount', 'Transaction Id', 'Category', 'Reason'];
      } else if (this.state.tabState === 'Pending') {
        headAll = ['Sent To', 'Amount', 'Transaction Id', 'Category', 'Reason'];
      } else {
        headAll = ['Sent By', 'Amount', 'Transaction Id', 'Category', 'Reason'];
      }
      const headers = <Headers head={headAll} specialProp="Actions" />;

      const data = <RenderTable head={headAll} data={this.props.dataAll} />;

      return (
        <div className="tables-main">
          <RenderTabs title="All Transactions" tabs={tabs} changeTab={this.changeTab} />
          <table className="tables-main">
            <thead>
              {headers}
            </thead>
            <tbody>
              {data}
            </tbody>
          </table>
        </div>
      );
    } else if (this.props.tableType === 'contacts') {
      const tabs = ['Send', 'Receive'];

      let headAll;
      if (this.state.tabState === 'Send') {
        headAll = ['Transaction Id', 'Amount', 'Category', 'Reason'];
      } else {
        headAll = ['Transaction Id', 'Amount', 'Category', 'Reason'];
      }
      const headers = <Headers head={headAll} specialProp="Actions" />;

      const data = <RenderTable head={headAll} data={this.props.dataAll} />;

      return (
        <div className="tables-main">
          <RenderTabs title="All Transactions" tabs={tabs} changeTab={this.changeTab} />
          <table className="tables-main">
            <thead>
              {headers}
            </thead>
            <tbody>
              {data}
            </tbody>
          </table>
        </div>
      );
    }

    return (<div>Invalid Table Type</div>);
  }
}

export default Tables;
