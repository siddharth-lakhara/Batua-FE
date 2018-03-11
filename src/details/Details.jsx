import React, { Component } from 'react';
import './details.css';

class Details extends Component {
  render() {
    return (
      <div className="details-main">
        <div className="details">
          <div className="details-logo">
            <i className="large material-icons">{this.props.icon}</i>
          </div>
          <div className="details-text" >
            <input
              className="details-textArea"
              type={this.props.type}
              placeholder={this.props.placeholder}
              onChange={this.props.change}
            />
          </div>
        </div>
        <div className="line" />
      </div>
    );
  }
}
export default Details;
