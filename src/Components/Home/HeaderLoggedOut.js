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
                            <div id="create-btn-wrap-left">
                                <NewButton/>
                            </div>
                            
                        </div>
            
                        <div className="right-section">
                            {/* <NewButton props={props.props}/> */}
                            {/* <div className="button-box-logged-out"></div> */}
                            <div className="search-box-wrap-header">
                                <Search/>
                            </div>
                           
                            {/* <i id="fa-search" className="fas fa-search" style={{color: 'rgb(95, 95, 95)', fontSize:'20px',marginRight:20}}></i> */}
                            <div id="create-btn-wrap-right">
                                <NewButton/>
                            </div>
                            <i className="fas fa-user-circle" style={{color: 'white', fontSize:'20px'}}></i>

                            <div className="sign-up-log-in-wrap">
                                <LoginButton/>
                                <SignUpButton/>
                               
                            </div>
                        </div>
                    </div>
                    <div id="search-field-wrap" style={{position:'absolute',height:50,width:'100%',backgroundColor:'#0f0f0f',left:'0px',zIndex:'9999999'}}>
                        <Search/>
                    </div>
                </div>
             
        </div>
    )
}


export default HeaderLoggedOut;