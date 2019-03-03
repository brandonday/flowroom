import React, { Component } from 'react';
import '../styles/stylesheet.css';
import Responsive from 'react-responsive';
 
const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

 const Search = () => (
    <div style={{
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }}>
        <div className="search-box">
            <div className="magnify-3x"></div>
            <input className="search-input" type="text" autocapitalize="none" placeholder="Search for rooms, users and tags" value=""/>
        </div>
    </div>
)


  
export default Search;