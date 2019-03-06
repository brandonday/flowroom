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
            <i style={{color:'rgb(95, 95, 95)',
    width:'30px',
    height:'30px',
    /* text-align: center; */
    alignItems:'center',
    display:'flex',
    justifyContent:'center',
    margin:'0px 10px 0'
 }} className="fas fa-search"></i>
            <input className="search-input" type="text" autoCapitalize="none" placeholder="Search for rooms, users and tags"/>
        </div>
    </div>
)



export default Search;
