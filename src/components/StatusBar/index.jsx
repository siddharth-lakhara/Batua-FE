import React from 'react';
import axios from 'axios';
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
    this.setState({
      isOpen: !this.state.isOpen,
    });
    if (this.state.isOpen) this.props.removeNotifications();
    if (!this.state.isOpen) {
      this.props.notifications.forEach((transactions) => {
        axios.patch(
          '/transactions/seen', {
            transactionId:
             transactions.transactionId,
          },
          { headers: { Authorization: this.props.authToken } },
        );
      });
    }
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

               {this.props.notifications.length >= 1 ? <span className="Header-icon">&nbsp;</span> : null}

             </button>
             {
                this.state.isOpen ?
                  <div className="Header-dropdown-content" >
                    {this.props.notifications.reverse().map(item => (
                      <div>
                        <StatusNotification
                          modalType={item.type}
                          friendName={item.name}
                          transactionId={item.transactionId}
                          paymentAmount={item.amount}
                          paymentReason={item.reason}
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
