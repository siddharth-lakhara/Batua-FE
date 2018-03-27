import React from 'react';

// import close from './ic-close.png';

import './StatusNotification.css';

class StatusNotification extends React.Component {
  getColor = (type) => {
    const mapping = {
      DECLINED: 'red', sent: 'green', requested: 'orange', APPROVED: 'green',
    };
    return mapping[type];
  }

  render = () => (
    <div
      // onRequestClose={this.props.closeModal}
      className={this.getColor(this.props.modalType)}
    >
      <div className="Notification-container">
        {/* <button onClick={this.props.close} className="Notification-close-button">
          <img
            src={close}
            className="Notification-close"
            alt="close"
            width="20"
          />
        </button> */}
        <div className="Notification-payment">
          {this.props.friendName} has {this.props.modalType} ₹ {this.props.paymentAmount}
        </div>
        <div className="Notification-reason">Reason: {this.props.paymentReason}
        </div>
        {
              (this.props.modalType === 'requested') ?
                <div className="Notification-choose">
                  <button className="Notification-approve"onClick={() => this.props.approve(this.props.transactionId, 'YES')}>
                  Accept
                  </button>
                  <button className="Notification-reject" onClick={() => this.props.approve(this.props.transactionId, 'NO')}>
                  Reject
                  </button>
                </div>
            : null
            }
      </div>
    </div>
  );
}
export default StatusNotification;
