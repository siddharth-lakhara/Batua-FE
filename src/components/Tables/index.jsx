import React from 'react';
import axios from 'axios';
import allFilterFunctions from './filters';
import RenderTabs from './Helpers/RenderTabs';
import Headers from './Helpers/Headers';
import restructuredData from './Helpers/restructureData';
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
//     type- transactionType => ['All', 'Send', 'Rejected']
//     type- transactionStatus => ['Completed', 'Pending', 'Received']
//     type- contacts => ['Send', 'Receive']

const RenderTable = (props) => {
  const {
    head, data, actionProp, authToken, currentUser,
  } = props;

  const filterFunction =
    allFilterFunctions(props.tableType, props.tableTab);
  const filteredData =
    data.filter(row => filterFunction(row, props.currentUser, props.currentContact));

  const newData = restructuredData(head, filteredData);
  // const newData = restructuredData(head, data);
  // const newData = filteredData;
  const handleChange = (event, transactionId) => {
    axios.patch(
      '/transactions/category',
      {
        category: event.target.value,
        transactionId,
      }, { headers: { Authorization: authToken } },
    );
    console.log('DONE');
  };
  // Render data
  const rows = Object.keys(newData).map((rowIndex) => {
    const row = Object.keys(newData[rowIndex]).map((rowElemIndex) => {
      const { transactionId } = newData[rowIndex];
      if (rowElemIndex === 'category') {
        if (currentUser === newData[rowIndex].fromUser ||
            newData[rowIndex].fromUser === undefined) {
          return (
            <td>
              <select
                onChange={e => handleChange(e, transactionId)}
                defaultValue={newData[rowIndex].category}
              >
                <option value={null}>Select Category</option>
                <option value="Bills">Bills</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Food">Food</option>
                <option value="Fuel">Fuel</option>
                <option value="Shopping">Shopping</option>
                <option value="Investment">Investment</option>
                <option value="Travel">Travel</option>
              </select>
            </td>);
        } return newData[rowIndex].category ?
          <td className="tables-row-element" key={`${rowIndex}${rowElemIndex}`}>
            {newData[rowIndex].category}
          </td> :
          <td className="tables-row-element" key={`${rowIndex}${rowElemIndex}`}>
            null
          </td>;
      }
      return (
        <td className="tables-row-element" key={`${rowIndex}${rowElemIndex}`}>
          {newData[rowIndex][rowElemIndex]}
        </td>);
    });
    if (actionProp) {
      row.push(<td><button onClick={() => { console.log('row: ', newData[rowIndex], 'decision: Accept'); }}>Accept</button> / <button onClick={() => { console.log('row: ', newData[rowIndex], 'decision: Rejected'); }}>Reject</button></td>);
    }
    return (<tr className="tables-row">{row}</tr>);
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
    // console.log('alldata: ', this.props.dataAll);
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

      const data = (<RenderTable
        head={headAll}
        data={this.props.dataAll}
        tableType={this.props.tableType}
        tableTab={this.state.tabState}
        currentUser={this.props.currentUser}
        authToken={this.props.authToken}
      />);

      return (
        <div className={
          (this.props.crop === 'crop') ? 'tables-div-crop' : 'tables-div'
        }
        >
          <RenderTabs title="All Transactions" tabs={tabs} changeTab={this.changeTab} tabState={this.state.tabState} />
          <table className="tables-main" width="100%" cellSpacing="0" cellPadding="0">
            <thead>
              {headers}
            </thead>
            <tbody className="Tables-content">
              {data}
            </tbody>
          </table>
        </div>
      );
    } else if (this.props.tableType === 'transactionStatus') {
      const tabs = ['Completed', 'Pending', 'Rejected'];
      let actionProp = false;
      let headAll;
      if (this.state.tabState === 'Completed') {
        headAll = ['Sent To', 'Sent By', 'Amount', 'Transaction Id', 'Status', 'Category', 'Reason'];
      } else if (this.state.tabState === 'Pending') {
        headAll = ['Sent To', 'Sent By', 'Amount', 'Transaction Id', 'Status', 'Category', 'Reason'];
        actionProp = true;
      } else {
        headAll = ['Sent To', 'Sent By', 'Amount', 'Transaction Id', 'Status', 'Category', 'Reason'];
      }
      const headers = <Headers head={headAll} specialProp={actionProp} />;

      const data = (<RenderTable
        head={headAll}
        data={this.props.dataAll}
        tableType={this.props.tableType}
        tableTab={this.state.tabState}
        currentUser={this.props.currentUser}
        authToken={this.props.authToken}
      />);

      return (
        <div className={this.props.crop ? 'tables-div-crop' : 'tables-div'}>
          <RenderTabs title="All Transactions" tabs={tabs} changeTab={this.changeTab} />
          <table className="tables-main" width="100%" cellSpacing="0" cellPadding="0">
            <thead>
              {headers}
            </thead>
            <tbody className="Tables-content">
              {data}
            </tbody>
          </table>
        </div>
      );
    } else if (this.props.tableType === 'contacts') {
      const tabs = ['Send', 'Receive'];
      const headAll = ['Sent To', 'Sent By', 'Amount', 'Status', 'Transaction Id', 'Category', 'Reason'];

      const headers = <Headers head={headAll} />;

      const data = (<RenderTable
        head={headAll}
        data={this.props.dataAll}
        tableType={this.props.tableType}
        tableTab={this.state.tabState}
        currentUser={this.props.currentUser}
        authToken={this.props.authToken}
      />);

      return (
        <div className={this.props.crop ? 'tables-div-crop' : 'tables-div'}>
          <RenderTabs title="Contacts Transactions" tabs={tabs} changeTab={this.changeTab} tabState={this.state.tabState} />
          <table className="tables-main" width="100%" cellSpacing="0" cellPadding="0">
            <thead>
              {headers}
            </thead>
            <tbody className="Tables-content">
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
