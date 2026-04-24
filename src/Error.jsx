import React from 'react';
import 'Error.css';
import errorlogo from 'errorlogo.png';

function Error() {
    return (
      <div className="error-container">
        <main className="error-content">
          <div className="logo-wrapper">
            <img src={errorlogo} alt="404 Error Logo" className="error-logo" />
          </div>
          
          <h1 className="error-title">ERROR – Not Found</h1>
          
          <p className="error-message">
            Sorry, the page you tried to open could not be found.<br />
            Contact your local Sifaka Lemur for assistance.
          </p>
        </main>
      </div>
    );
  }

export default Error