import React, { Component } from 'react';
import '../styles/stylesheet.css';
import { Link } from 'react-router-dom';

const SignUpButton = () => (
        <div className="signup-button-wrap">
                <Link to="/signup">
                        <button style={{backgroundColor:'rgb(64, 255, 232)',
    borderRadius:'2px',
    width:'85px',
    height:'30px',
    border:'0px',
    fontSize:'16px',
    color:'black',
    fontWeight:'bold',
    fontSize:'12px'
  }}>
                                SIGN UP
                        </button>
               </Link>
        </div>
   )

export default SignUpButton;
