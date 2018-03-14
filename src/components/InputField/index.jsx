import React, { Component } from 'react';
import './InputField.css';

class InputField extends Component {
  render() {
    return (
      <div className="InputField-main">
        <div className="InputField">
          <div className="InputField-logo">
            <i className="large material-icons">{this.props.icon}</i>
          </div>
          <div className="InputField-text" >
            <input
              className="InputField-textArea"
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
export default InputField;
