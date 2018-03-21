import Modal from 'react-modal';
import React from 'react';

import './Notification.css';

const Notification = ({
  isOpen, modalType,
  friendName, paymentAmount, paymentReason, transactionId,
  approve, closeModal, afterOpenModal, customStyles,
}) => (
  <Modal
    isOpen={isOpen}
    onAfterOpen={afterOpenModal}
    onRequestClose={closeModal}
    style={customStyles}
  >
    <div className="Notification-container">
      <button className="Notification-close" onClick={closeModal}>x</button>
      <div className="Notification-payment">
        {friendName} has {modalType} {paymentAmount}
      </div>
      <div className="Notification-reason">with reason: {paymentReason}</div>
      {
              (modalType === 'requested') ?
                <div clasName="Notification-choose">
                  <button className="Notification-approve"onClick={() => approve(transactionId, 'YES')}>
                  Accept
                  </button>
                  <button className="Notification-reject" onClick={() => approve(transactionId, 'NO')}>
                  Reject
                  </button>
                </div>
            : null
            }
    </div>
  </Modal>);
export default Notification;
