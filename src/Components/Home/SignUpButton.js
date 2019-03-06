import React, { Component } from 'react';
import '../styles/stylesheet.css';
import { Link } from 'react-router-dom';

const SignUpButton = () => (
        <div className="signup-button-wrap">
                <Link to="/signup">
                        <button style={{backgroundColor:'rgb(179, 0, 254)',
    borderRadius:'2px',
    width:'85px',
    height:'30px',
    border:'0px',
    fontSize:'16px',
    color:'rgb(198, 198, 198)',
    fontWeight:'bold',
    fontSize:'12px'
  }}>
                                Sign Up
                        </button>
               </Link>
        </div>
   )

export default SignUpButton;
