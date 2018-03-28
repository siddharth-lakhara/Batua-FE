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
    head, data, actionProp, tableType, authToken, currentUser,
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
  };
  const getColor = (rowElemIndex, rowIndex, newData) => {
    if (rowElemIndex === 'status') {
      if (newData[rowIndex][rowElemIndex] === 'COMPLETED') {
        return 'green';
      } else if (newData[rowIndex][rowElemIndex] === 'PENDING') {
        return 'orange';
      } else if (newData[rowIndex][rowElemIndex] === 'REJECTED') {
        return 'red';
      }
      return 'black';
    }
  };
  // Render data
  const rows = Object.keys(newData).map((rowIndex) => {
    const row = Object.keys(newData[rowIndex]).map((rowElemIndex) => {
      const { transactionId } = newData[rowIndex];
      if (rowElemIndex === 'category') {
        if (currentUser === newData[rowIndex].fromUser ||
            newData[rowIndex].fromUser === undefined) {
          return (
            <td className="table-category-column">
              <select
                className="table-select"
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
            Uncategorized
          </td>;
      } else if (rowElemIndex === 'split') {
        return (<td><button onClick={() => { props.onSplit(newData[rowIndex].amount, newData[rowIndex].reason); }}>Split</button> </td>);
      }
      return (
        <td
          className="tables-row-element"
          style={{ color: getColor(rowElemIndex, rowIndex, newData) }}
          key={`${rowIndex}${rowElemIndex}`}
        >
          {newData[rowIndex][rowElemIndex]}
        </td>);
    });
    if (actionProp) {
      row.push(<td><button onClick={() => { console.log('row: ', newData[rowIndex], 'decision: Accept'); }}>Accept</button> / <button onClick={() => { console.log('row: ', newData[rowIndex], 'decision: Rejected'); }}>Reject</button></td>);
    }
    if (tableType === 'split') {
      row.push(<td><button onClick={() => { props.onSplit(newData[rowIndex].amount, newData[rowIndex].reason); }}>Split</button> </td>);
    }

    return (<tr className="tables-row">{row}</tr>);
  });
  console.log(currentUser, props.currentContact);
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
        headAll = ['Sent To', 'Sent By', 'Amount', 'Status', 'Category', 'Reason'];
      } else if (this.state.tabState === 'Send') {
        headAll = ['Sent To', 'Amount', 'Status', 'Category', 'Reason'];
      } else {
        headAll = ['Sent By', 'Amount', 'Status', 'Category', 'Reason'];
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
          <RenderTabs title={this.props.title || 'All Transactions'} tabs={tabs} changeTab={this.changeTab} tabState={this.state.tabState} />
          <div className="Home-scrollBody" >
            <table className="tables-main" width="100%" cellSpacing="0" cellPadding="0">
              <thead>
                {headers}
              </thead>
              <tbody className="Tables-content">
                {data}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else if (this.props.tableType === 'transactionStatus') {
      const tabs = ['Completed', 'Pending', 'Rejected'];
      let actionProp = false;
      let headAll;
      if (this.state.tabState === 'Completed') {
        headAll = ['Sent To', 'Sent By', 'Amount', 'Status', 'Category', 'Reason'];
      } else if (this.state.tabState === 'Pending') {
        headAll = ['Sent To', 'Sent By', 'Amount', 'Status', 'Category', 'Reason'];
        actionProp = true;
      } else {
        headAll = ['Sent To', 'Sent By', 'Amount', 'Status', 'Category', 'Reason'];
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
          <div className="Home-scrollBody" >
            <table className="tables-main" width="100%" cellSpacing="0" cellPadding="0">
              <div>
                <thead>
                  {headers}
                </thead>
              </div>
              <div>
                <tbody className="Tables-content">
                  {data}
                </tbody>
              </div>
            </table>
          </div>
        </div>
      );
    } else if (this.props.tableType === 'contacts') {
      const tabs = ['Send', 'Receive'];
      const headAll = ['Sent To', 'Sent By', 'Amount', 'Status', 'Category', 'Reason'];

      const headers = <Headers head={headAll} />;

      const data = (<RenderTable
        head={headAll}
        data={this.props.dataAll}
        tableType={this.props.tableType}
        tableTab={this.state.tabState}
        currentUser={this.props.currentUser}
        authToken={this.props.authToken}
        currentContact={this.props.currentContact}
      />);

      return (
        <div className={this.props.crop ? 'tables-div-crop' : 'tables-div'}>
          <RenderTabs title="Contacts Transactions" tabs={tabs} changeTab={this.changeTab} tabState={this.state.tabState} />
          <div className="Home-scrollBody" >
            <table className="tables-main" width="100%" cellSpacing="0" cellPadding="0">
              <thead>
                {headers}
              </thead>
              <tbody className="Tables-content">
                {data}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else if (this.props.tableType === 'split') {
      // const tabs = ['Send', 'Receive'];
      const headAll = ['Sent To', 'Amount', 'Transaction Id', 'Category', 'Reason', 'split'];

      const headers = <Headers head={headAll} />;

      const data = (<RenderTable
        head={headAll}
        data={this.props.dataAll}
        tableType={this.props.tableType}
        tableTab={this.props.currentTab}
        currentUser={this.props.currentUser}
        currentContact={this.props.currentContact}
        onSplit={this.props.onSplit}
      />);

      return (
        <div className="tables-div">
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
