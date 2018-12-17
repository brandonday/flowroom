import React, { Component } from 'react';
import '../styles/stylesheet.css';
import { Link } from 'react-router-dom';

const LoginButton = () => (
   <div className="login-button-wrap">
      <Link to="/login">
         <button className="login-button">
            Log In
         </button>
      </Link>
   </div>
)
 
export default LoginButton;