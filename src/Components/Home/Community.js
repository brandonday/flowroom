import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { firebase } from '../firebase/firebase';


 class Community extends Component {
     constructor() {
        super();
     }
     componentDidMount(){
    

     }

     saveCommunity() {
        let database = firebase.database();
        let Community = document.getElementById('community-section-input-field').value;
        let SideBarText = document.getElementById('community-side-bar-text').value;
        let shortTitle = document.getElementById('short-title').value;
        let community = {
            community:Community,
            shortTitle:shortTitle,
            sidebarText:SideBarText,
            date: new Date()
        }
        database.ref(`Communities/${Community}/`).update(community).then(() => {

            // history.push(`${shortID}`)

        });
     }
    render() {
    return(<div className="create-community-wrap">
        <div className="main-section-wrap-community-screen">
            <div className="main-section-community-box">
                <p className="community-screen-label">{'Create Community'}</p>
                <p className="create-community-text">Here you can create a new community. Fill out the details below.</p>
                <p className="create-community-text">Before creating, please read the {'terms of use'}.</p>
                <div className="create-community-name-wrap">
                    <p className="create-community-name">NAME</p>
                    <input id="community-section-input-field" className="community-section-input-field" placeholder="Name"/>
                </div>
                <div className="create-community-name-wrap">
                    <p className="create-community-shorter-title">SHORTER TITLE</p>
                    <input id="short-title" className="community-section-input-field" placeholder="Short title"/>
                </div>
                <div className="create-community-name-wrap">
                    <p className="create-sidebar-text">SIDEBAR TEXT</p>
                    <textarea id="community-side-bar-text" className="community-side-bar-text" placeholder="Description"/>
                </div>
                <button onClick={this.saveCommunity.bind(this)} className="community-create-community-button">
                    Create Community
                </button>
            </div>
        </div>
    </div>)
    }
 }

export default Community;