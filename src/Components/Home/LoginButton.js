import React, { Component } from 'react';
import '../styles/stylesheet.css';
import { Link } from 'react-router-dom';

const LoginButton = () => (
   <div className="login-button-wrap">
      <Link to="/login">
         <button style={{backgroundColor:'#B300FE',
  borderRadius:'2px',
  width:'100px',
  height:'30px',
  border:'0',
  fontSize:'16px',
  color:'#C6C6C6',
  fontWeight:'bold'}}>
            SIGN UP
         </button>
      </Link>
   </div>
)
 
export default LoginButton;