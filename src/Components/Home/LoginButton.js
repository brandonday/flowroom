import React, { Component } from 'react';
import '../styles/stylesheet.css';
import { Link } from 'react-router-dom';

const LoginButton = () => (
   <div className="login-button-wrap">
      <Link to="/login">
         <button style={{backgroundColor:'rgb(24, 24, 24)',
    borderRadius:'2px',
    width:'100px',
    height:'30px',
    border:'1px solid rgb(64, 255, 232)',
    fontSize:'12px',
    color:'rgb(64, 255, 232)',
    fontWeight:'bold'}}>
            SIGN IN
         </button>
      </Link>
   </div>
)

export default LoginButton;
