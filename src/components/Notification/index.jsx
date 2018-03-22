import Modal from 'react-modal';
import React from 'react';

import close from './ic-close.png';

import './Notification.css';

class Notification extends React.Component {
  getColor = (type) => {
    const mapping = {
      DECLINED: 'red', sent: 'green', requested: 'orange', APPROVED: 'green',
    };
    return mapping[type];
  }

  render = () => (
    <Modal
      isOpen={this.props.isOpen}
      onAfterOpen={this.props.afterOpenModal}
      onRequestClose={this.props.closeModal}
      style={this.props.customStyles}
      overlayClassName="Notification-overlay"
      className={this.getColor(this.props.modalType)}
    >
      <div className="Notification-container">
        <button onClick={this.props.closeModal} className="Notification-close-button">
          <img
            src={close}
            className="Notification-close"
            alt="close"
            width="20"
          />
        </button>
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
    </Modal>);
}
export default Notification;
