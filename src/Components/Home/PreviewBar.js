import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Responsive from 'react-responsive';


const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

 const PreviewBar = () => (
    <div style={{display:'flex', width:'100%', height:'36px'}}>
        <div style={{flex:1, border:'0px solid red'}}>
            <p style={{
                marginLeft:'16px',
                fontFamily:'Source Sans Pro',
                fontSize:'16px',
                marginTop:'3px',
                fontWeight:'500',
                color:'#80848C'
            }}>Preview</p>
        </div>
        <Desktop>
        <div style={{display:'flex',alignItems:'center',marginRight:'27px',marginBottom:'2px'}}>
            <div className="play-3x"></div>
            <p className="preferences">Preferences</p>
            <p className="clone">Clone</p>
            <p className="report">Report</p>
            <p className="flag">Flag</p>
            <p className="live">Live</p>
            <div className="on-switch-wrap">
                <div className="on-switch"></div>
            </div>
        </div>
        </Desktop>
        <Tablet>
        <div style={{display:'flex',alignItems:'center',marginRight:'27px',marginBottom:'2px'}}>
            <div className="play-3x"></div>
            <p className="preferences">Preferences</p>
            <p className="clone">Clone</p>
            <p className="report">Report</p>
            <p className="flag">Flag</p>
            <p className="live">Live</p>
            <div className="on-switch-wrap">
                <div className="on-switch"></div>
            </div>
        </div>
        </Tablet>
        <Mobile>
        <div style={{display:'flex',alignItems:'center',marginRight:'27px',marginBottom:'2px'}}>
            <div className="play-3x"></div>
            <p className="live-mobile">Live</p>
            <div className="on-switch-wrap-mobile">
                <div className="on-switch-mobile"></div>
            </div>
        </div>
        </Mobile>

    </div>  
)

export default PreviewBar;