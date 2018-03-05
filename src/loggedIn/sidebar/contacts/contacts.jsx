import React from 'react';
import './contacts.css';

const Contacts = () => (
  <div className="Contacts-main">
    <div className="Contacts-head">
      Contacts
    </div>
    <div className="Contacts-content">
      <div>
        <button className="Contacts-contentItem">
          All Contacts
        </button>
      </div>
      <div>
        <button className="Contacts-contentItem">
          Groups
        </button>
      </div>
    </div>
  </div>
);

export default Contacts;

