import React, { Component } from 'react';
import '../styles/stylesheet.css';
import { Link } from 'react-router-dom';


const newclicked = () => {
    if(document.getElementById('newbtn').style.display !== 'block') {
        document.getElementById('newbtn').style.display = 'block';
        document.getElementById('new-button-dropdown').style.backgroundColor = '#0A7F29';
    } else {
        document.getElementById('newbtn').style.display = 'none';
        document.getElementById('new-button-dropdown').style.backgroundColor = 'transparent';
    }

}

const NewMessageButton = () => {
    return  (
        <div>
            <div onClick={newclicked} 
                id="new-button-dropdown" 
                className="new-button-dropdown">
                <div className="new-btn">
                    <button className="new-button" style={{width:'134px'}}>
               
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewMessageButton;