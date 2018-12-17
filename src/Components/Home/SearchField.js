import React, { Component } from 'react';
import '../styles/stylesheet.css';
import Responsive from 'react-responsive';
 
const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

 const Search = () => (
    <div>
        <div className="search-box">
            <div className="magnify-3x"></div>
            <input className="search-input" type="text" autocapitalize="none" placeholder="Search" value=""></input>
        </div>
    </div>
)


  
export default Search;