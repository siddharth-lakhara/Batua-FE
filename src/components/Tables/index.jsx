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
  const { type, head } = props;
  console.log('Head: ', head);
  return null;
};

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabState: props.currentTab,
    };
  }

  changeTab = (newTab) => {
    console.log('previous tab: ', this.state.tabState);
    this.setState({ tabState: newTab });
  }

  render() {
    if (this.props.tableType === 'transactionType') {
      const tabs = ['All', 'Send', 'Received'];
      const headAll = ['Sent To', 'Sent By', 'Amount', 'Status', 'Transaction Id', 'Category', 'Reason'];
      const headSend = ['Sent To', 'Amount', 'Status', 'Transaction Id', 'Category', 'Reason'];
      const headReceive = ['Sent By', 'Amount', 'Status', 'Transaction Id', 'Category', 'Reason'];
      const headers = <Headers type="transactionType" tab={this.props.currentTab} />;
      return (
        <div className="tables-main">
          <RenderTabs title="All Transactions" tabs={tabs} changeTab={this.changeTab} />
          {/* <RenderTable headers={headers} data={data} /> */}
          {/* {<Headers type="transactionType" head={`${'head' + 'All'}`} tab={this.props.currentTab} />} */}
          {console.log('UserName: ', this.props.currentUser)}
        </div>
      );
    } else if (this.props.tableType === 'transactionStatus') {
      return (<div className="tables-main">Table Type: transactionStatus</div>);
    } else if (this.props.tableType === 'contacts') {
      return (<div className="tables-main">Table Type: contacts</div>);
    }

    return (<div>Invalid Table Type</div>);
  }
}

export default Tables;
