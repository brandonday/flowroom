import React, { Component } from 'react';
import {Link} from 'react-router-dom';

const SignUpForm2 = () => (
    <div style={{flex:'1',display:'flex'}}>
        <div className="main-section-wrap-signup-screen">
            <p className="signup-screen-label">{'{sign up}'}</p>
            <div className="main-section-signup-box" style={{height:400}}>
                <p className="signup-section-p">Enter more information</p>
            </div>
        </div>
    </div>
);

export default SignUpForm2;