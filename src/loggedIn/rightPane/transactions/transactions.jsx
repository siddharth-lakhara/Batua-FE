import React from 'react';
import TransactionsHeader from './transactionHeader';
import TransactionsDisplayer from './transactionDisplayer';
import './transactions.css';

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayTab: 0,
    };
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab(newTabValue) {
    this.setState({
      displayTab: newTabValue,
    }, () => {
      console.log('new tab: ', this.state.displayTab);
    });
  }

  render() {
    return (
      <div className="Transactions2-main">
        <TransactionsHeader
          displayTab={this.state.displayTab}
          changeTab={this.changeTab}
        />
        <TransactionsDisplayer displayTab={this.state.displayTab} />
      </div>
    );
  }
}

export default Transactions;

