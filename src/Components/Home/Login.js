import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAccount } from '../../actions/authentication';


const loginUserAccount = ({ loginAccount }) => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    
    loginAccount(email, password).then(()=> {
        alert('signed up')
    }).catch((error) => {
        alert('error')
    });
}

const signUpHere = () => (
    <p className="login-section-sign-up-here-p">Sign up here.</p>
)

 const Login = (props) => (
    <div className="login-screen-wrap">
        <div className="main-section-wrap-login-screen">
            <p className="login-screen-label">{'{log in}'}</p>
            <div className="main-section-login-box">
                <p className="login-section-p">Welcome back!</p>
                <div className="login-section-fields">
                    <div style={{flex:1}}>
                        <p className="email-address-label">Email Address</p>
                        <input id="email" style={{marginRight:'16px'}} className="login-section-input-field" placeholder="Email Address"/>
                    </div>
                    <div className="password-forgot-password">
                        <p className="password-label">Password</p>
                        <div style={{display:'flex'}}>
                            <input id="password" style={{flex:1}} className="login-section-input-field-password" type="password" placeholder="Password"/>
                            <div className="forgot-button">Forgot ?</div>
                        </div>
                    </div>
                </div>
                <p className="forgot-password">Forgot password?</p>
                <button onClick={()=>{loginUserAccount(props)}} className="login-section-login-button">Log In</button>
                <p style={{display:'flex'}} className="login-section-p">Don't have an account? <Link to="/signup">{signUpHere()}</Link></p>
            </div>
        </div>
    </div>
)


const mapDispatchToProps = (dispatch) => ({
    loginAccount: (email, password) => dispatch(loginAccount(email,password))
});

const ConnectedLogin = connect(undefined, mapDispatchToProps)(Login)

export default ConnectedLogin;