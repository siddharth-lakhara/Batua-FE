import Modal from 'react-modal'
;
const Notification = () =>
  render = () => (
    <Modal
      isOpen={this.state.modalIsOpen}
      onAfterOpen={this.afterOpenModal}
      onRequestClose={this.closeModal}
      style={this.customStyles}
      contentLabel="Example Modal"
    >

      <h2 ref={(subtitle) => { this.subtitle = subtitle; }}>Hello</h2>
      <button onClick={this.closeModal}>close</button>
      <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
    </Modal>);
