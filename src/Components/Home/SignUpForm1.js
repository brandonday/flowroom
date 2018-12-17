import React, { Component } from 'react';
import {Link} from 'react-router-dom';

const SignUpForm1 = () => (
    <div style={{flex:'1',display:'flex'}}>
        <div style={{flex:'1',display:'flex'}}>
            <div className="main-section-wrap-signup-screen">
                <p className="signup-screen-label">{'{sign up}'}</p>
                <div className="main-section-signup-box">
                    <p className="signup-section-p">Fill in all the fields below</p>
                    <div className="signup-section-fields">
                        <div>
                            <p className="signup-screen-lbl">Name</p>
                            <input type="text" style={{marginRight:'16px'}} className="signup-section-input-field" placeholder="Name"/>
                        </div>
                        <div>
                            <p className="signup-screen-lbl">Email</p>
                            <input type="text" id="email" className="signup-section-input-field" placeholder="email@address.com"/>
                        </div>
                    </div>
                    <div className="signup-section-fields">
                        <div>
                            <p className="signup-screen-lbl">Username</p>
                            <input type="text" id="username" style={{marginRight:'16px'}} className="signup-section-input-field" placeholder="15 characters"/>
                        </div>
                        <div>
                            <p className="signup-screen-lbl">Password</p>
                            <input type="text" id="password" type="password" className="signup-section-input-field" placeholder="8+ Characters"/>
                        </div>
                    </div>
                    <button onClick={()=>this.createUserAccount(this.props)} className="signup-section-signup-button">Sign Up</button>
                    <p style={{display:'flex'}} className="signup-section-p">Already have an account? <Link to="/login">{this.LoginHere.bind(this)}</Link></p>
                </div>
            </div>
        </div>
    </div>
);

export default SignUpForm1;