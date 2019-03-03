import React, { Component } from 'react';
import Responsive from 'react-responsive';
 
const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

 const Logo = () => (
    <div>
        {/* <Desktop> */}
        <div className="logo-wrap">
            <a href="/" style={{color:'white',
  fontFamily:'Arial',
  fontSize:'35px',
  fontWeight:'700',
  lineHeight:'42px',
  textAlign:'left'}}>flowroom</a>
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
    </div>
)


  
export default Logo;