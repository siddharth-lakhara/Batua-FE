import React from 'react';
import './InputField.css';

const InputField = props => (
  <div className="InputField-main">
    <div className="InputField">
      <div className="InputField-logo">
        <i className="large material-icons">{props.icon}</i>
      </div>
      <div className="InputField-text" >
        <input
          className="InputField-textArea"
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.change}
        />
      </div>
    </div>
    <div className="line" />
  </div>
);

export default InputField;
