import React from 'react';
import axios from 'axios';
import RecentTransactions from './transactions/transactions';
import Table from '../../components/Tables';
// import BottomPane from './bottom/bottom';
import './contentCard.css';

class ContentPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [],
    };
  }

  componentDidMount() {
    axios.get('/transactions/history', {
      headers: {
        Authorization: this.props.authToken,
      },
    })
      .then((response) => {
        const { history } = response.data;
        this.updateHistory(history);
      });
  }

  updateHistory(history) {
    this.setState({
      history,
    });
  }

  render() {
    return (
      <div className="contentCard-main">
        <Table
          tableType="transactionType"
          dataAll={this.state.history}
          currentUser={this.props.userName}
          currentTab="All"
        />
        {/* <RecentTransactions
      userName={props.userName}
      authToken={props.authToken}
    /> */}
        {/* <BottomPane /> */}
      </div>
    );
  }
}

export default ContentPane;
