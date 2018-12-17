import React, { Component } from 'react';
import '../styles/stylesheet.css';
import { Link } from 'react-router-dom';

const SignUpButton = () => (
        <div className="signup-button-wrap">
                <Link to="/signup">
                        <button className="signup-button">
                                Sign Up
                        </button>
               </Link>
        </div>
   )
 
export default SignUpButton;