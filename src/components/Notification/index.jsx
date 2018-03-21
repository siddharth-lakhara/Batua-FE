import Modal from 'react-modal';
import React from 'react';

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
    <div>
      <button onClick={closeModal}>x</button>
      <div>{friendName} has {modalType} {paymentAmount}</div>
      <div>with reason: {paymentReason}</div>
      {
              (modalType === 'requested') ?
                <div>
                  <button onClick={() => approve(transactionId, 'YES')}>
                  Accept
                  </button>
                  <button onClick={() => approve(transactionId, 'NO')}>
                  Reject
                  </button>
                </div>
            : null
            }
    </div>
  </Modal>);
export default Notification;
