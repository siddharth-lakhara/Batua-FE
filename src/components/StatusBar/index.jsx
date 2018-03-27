import React from 'react';

import StatusNotification from '../StatusNotification';

import './StatusBar.css';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggle = () => {
    console.log('A');
    this.setState({
      isOpen: !this.state.isOpen,
    });
    if (this.state.isOpen) this.props.removeNotifications();
  }

   render = () => (
     <div className="Header-main">
       <div className="Header-titleText">
        My Wallet
       </div>
       <div className="Header-userinfoPane">
         <div className="Header-infoItems">
           <div className="Header-dropdown">
             <button className="Header-button" onClick={() => this.toggle()}>
               <i className="material-icons">notifications</i>
               <span>{this.props.notifications.length}</span>
             </button>
             {
                this.state.isOpen ?
                  <div className="Header-dropdown-content" >{this.props.notifications.map(i => (
                    <div>
                      <StatusNotification
                        modalType={i.type}
                        friendName={i.name}
                        transactionId={i.transactionId}
                        paymentAmount={i.amount}
                        paymentReason={i.reason}
                        approve={this.props.approve}
                      />
                    </div>))}
                  </div>
              : null
            }
           </div>
         </div>
         {/* <div className="Header-infoItems">
        User photo
      </div> */}
         <div className="Header-infoItems">
           {this.props.userName}
         </div>
         {/* <div className="Header-infoItems">
        Arrow
      </div> */}
       </div >

     </div>
   );
}

export default Header;
