import React, { Component } from 'react';
import Responsive from 'react-responsive';
import {Link} from 'react-router-dom';
const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

 const Logo = () => (
    <div>
        <a href="/">
        {/* <Desktop> */}
        <div className="logo-wrap" style={{marginRight:'17px'}}>
            <div style={{backgroundImage:'url(./public/logo.svg)',
                backgroundImage:'url(../logo.svg)',
                height:'31px',
                width:'136px',
                backgroundSize:'contain',
                backgroundRepeat:'no-repeat'
            }}></div>
        </div>
        {/* </Desktop> */}
        {/* <Tablet>
            <div className="logo-wrap">
                <a href="/" className="large-logo-tablet">flowroom</a>
            </div>
        </Tablet>
        <Mobile>
            <div className="logo-wrap">
                <a href="/" className="large-logo-mobile">flowroom</a>
            </div>
        </Mobile> */}
        </a>
    </div>
)


  
export default Logo;