import React, { Component } from 'react';
import {Link} from 'react-router-dom';

 const About = () => (
    <div className="" style={{flex:'1',display:'flex'}}>
        <div className="main-section-wrap-community-screen">
            <div className="main-section-community-box">
            <p className="community-screen-label">{'Create Community'}</p>
            <p style={{fontSize:'14px'}}>Here you can create a new community. Fill out the details below.</p>
            <p style={{fontSize:'14px'}}>Before creating, please read the {'terms of use'}.</p>
                <div style={{width:'100%'}}>
                    <p style={{fontSize:'12px'}}>NAME</p>
                    <input className="community-section-input-field" placeholder="email@address.com"/>
                </div>
                <div style={{width:'100%'}}>
                    <p style={{fontSize:'12px'}}>SHORTER TITLE</p>
                    <input className="community-section-input-field" placeholder="email@address.com"/>
                </div>
                <div style={{width:'100%'}}>
                    <p style={{fontSize:'12px'}}>SIDEBAR TEXT</p>
                    <textarea className="community-side-bar-text" placeholder="Description"/>
                </div>
                <button className="community-create-community-button">
                    Create Community
                </button>
            </div>
        </div>
    </div>
)

export default About;