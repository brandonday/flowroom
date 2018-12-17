import React, { Component } from 'react';
import RoomMain from './RoomMain.js';

const Room = (props) => {
    return (
        <div style={{display:'flex',flex:1,flexDirection:'column'}}>
            <RoomMain/> 
        </div>
    )
 }

export default Room;