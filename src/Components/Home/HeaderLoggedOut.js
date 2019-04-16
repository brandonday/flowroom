import React, { Component } from 'react';
import '../styles/stylesheet.css';
import Logo from './Logo.js';
import MyCommunitiesDropDown from './MyCommunitiesDropDown';
import NewButton from './NewButton.js';
import Search from './SearchField.js';
import MessageIcon from './MessageIcon.js';
import ProfilePic from './ProfilePic.js';
import LoginButton from './LoginButton.js';
import SignUpButton from './SignUpButton.js';
import Responsive from 'react-responsive';
import { connect } from 'react-redux';


 const HeaderLoggedOut = (props) => {
    return (
        <div style={{width:'100%'}}>    
           
                <div className="content-container">
                    <div className="header-content">
                        <div className="left-section">
                            <Logo/>
                            <NewButton/>
                        </div>
            
                        <div className="right-section">
                            {/* <NewButton props={props.props}/> */}
                            <div className="button-box-logged-out"></div>
                            <Search/>
                            <div className="sign-up-log-in-wrap">
                                <LoginButton/>
                                <SignUpButton/>
                               
                            </div>
                        </div>
                    </div>
                </div>
             
        </div>
    )
}

const ConnectedHeader = connect((state, ownProps) => {
    console.log('state', state);
    return {
        isLoggedIn:state.isLoggedIn,
        props:ownProps
    }
})(HeaderLoggedOut)

export default ConnectedHeader;