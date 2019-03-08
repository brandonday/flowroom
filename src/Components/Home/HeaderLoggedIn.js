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
import { connect } from 'react-redux';


class HeaderLoggedIn extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>    
                <header className="header">
                    <div className="content-container">
                        <div className="header-content">
                            <div className="left-section">
                                <Logo/>
                                <NewButton/>
                            </div>
            
                            <div className="right-section">
                                {/* <NewButton props={this.props}/> */}
                                <div className="button-box"></div>
                                <div className="message-icon-profile-pic-wrap-mobile">
                                    <MessageIcon/> 
                                    <ProfilePic/> {/* contains menu for profile */}
                                </div>
                                <Search/>
                                <div>
                                    <div className="message-icon-profile-pic-wrap">
                                        <MessageIcon onClick={this.openModal}/>
                                        <ProfilePic/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        )
    }

}

const ConnectedHeader = connect((state, ownProps) => {
    return {
        isLoggedIn:state.isLoggedIn,
        props:ownProps
    }
})(HeaderLoggedIn)

export default ConnectedHeader;