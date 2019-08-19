import React, { Component } from 'react';
import Responsive from 'react-responsive';
import {Link} from 'react-router-dom';
const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

 const Logo = () => (
    <div style={{display:'flex',alignItems:'center'}}>
    <i className="fas fa-bars" style={{color:'white',fontSize:18,marginRight:10}}></i>

        <a href="/">
        {/* <Desktop> */}
        <div className="logo-wrap" style={{marginRight:'17px'}}>
            <div id="fr-logo" style={{backgroundImage:'url(./public/logo.svg)',
                backgroundImage:'url(../logo.svg)',
                height:'35px',
                width:'157px',
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