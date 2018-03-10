import React, { Component } from 'react';
import './details.css';

class Details extends Component {
  render() {
    return (
      <div className="email-main">
        <div className="email">
          <div className="email-logo">
            <i class="large material-icons">{this.props.icon}</i>
          </div>
          <div className="email-text" >
            <textarea className="email-textArea" placeholder={this.props.placeholder} />
          </div>
        </div>
        <div className="line" />
      </div>
    );
  }
}
export default Details;
