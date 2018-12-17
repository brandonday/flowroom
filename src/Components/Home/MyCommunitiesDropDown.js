import React, { Component } from 'react';
import '../styles/stylesheet.css';
import Responsive from 'react-responsive';
 
 const MyCommunitiesDropDown = () => (
    <div>
        <div className="my-communities-drop" style={{width:'120px'}}>
            <a href="#" className="my-communities">My Communities</a>
            <a href="#" className="drop-down-arrow my-communities-down-3x"></a>
        </div>
    </div>
)
    

export default MyCommunitiesDropDown;