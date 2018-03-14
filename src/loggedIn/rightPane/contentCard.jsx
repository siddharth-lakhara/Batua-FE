import React from 'react';
import RecentTransactions from './transactions/transactions';
import './contentCard.css';

class ContentPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      card: '',
    };
  }

  render() {
    switch (this.state.page) {
      case ('allContacts'): {
        return (
          // <div className="AllContacts-container" />
          <div className="contentCard-main">
            <RecentTransactions
              userName={this.props.userName}
              authToken={this.props.authToken}
            />
            {/* <BottomPane /> */}
          </div>
        );
      }

      default: {
        return (
          <div className="contentCard-main">
            <RecentTransactions
              userName={this.props.userName}
              authToken={this.props.authToken}
            />
            {/* <BottomPane /> */}
          </div>
        );
      }
    }
  }
}


export default ContentPane;
