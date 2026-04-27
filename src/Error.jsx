import React from 'react';
import'./Error.css';
import errorlogo from './assets/errorlogo.png';
import Errortext from './assets/Errortext.png';

function Error() {
    return (
      <div className="container">
        <main className="error-content">
          <div className="logo-wrapper">
            <img src={errorlogo} className="error-logo"></img>
          </div>
          
          <h1 className="error-title">ERROR – Not Found</h1>
          <div className="logo-wrapper">
            <img src = {Errortext} className ="error-text"></img>
          </div>
        </main>
      </div>
    );
  }

export default Error