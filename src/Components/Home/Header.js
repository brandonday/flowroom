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
import HeaderLoggedIn from './HeaderLoggedIn.js';
import HeaderLoggedOut from './HeaderLoggedOut.js';
import { firebase } from '../firebase/firebase';
import { connect } from 'react-redux';
import M from 'materialize-css';


let database = firebase.database();

class Header extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn:false,
            isInit:true
        }
    }
    componentDidMount() {
        let that = this;
        firebase.auth().onAuthStateChanged((user) => {
            console.log("firebase.auth user: ",user);
            if(user) {
               that.setState({isLoggedIn:true,isInit:false});
            } else {
                that.setState({isLoggedIn:false,isInit:false});
            }
        });
    }
    render() {
    
        let that = this;
        
        return (
            <div style={{width:'100%'}}>  
    
                <header id="header" className="header" style={{width:'100%'}}>
                    {that.state.isInit ? '' : (that.state.isLoggedIn ? (<HeaderLoggedIn/>):(<HeaderLoggedOut/>))}
                </header>
  
            </div>
        )
    }

}

// const ConnectedHeader = connect((state, ownProps) => {
//     return {
//         isLoggedIn:state.isLoggedIn,
//         props:ownProps
//     }
// })(Header)

export default Header;